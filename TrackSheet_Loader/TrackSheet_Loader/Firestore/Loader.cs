using CsvHelper;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Firestore;
using Google.Cloud.Firestore.V1;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Channels;
using System.Threading.Tasks;

namespace TrackSheet_Loader
{
    
    public class Loader
    {
        private  readonly FirestoreDb db;
        public Loader()
        {
            //https://github.com/GoogleCloudPlatform/dotnet-docs-samples/tree/main/firestore

            //GoogleCredential cred = GoogleCredential.FromFile("JsonCredentials.json");

            //string filepath = "JsonCredentials.json";
            //Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", filepath);

            var jsonString = File.ReadAllText("JsonCredentials.json");
            var builder = new FirestoreClientBuilder() { JsonCredentials = jsonString };
            db = FirestoreDb.Create("parttrack-d4832", builder.Build());

            //db = FirestoreDb.Create("parttrack-d4832");

        }

        public void DownloadData()
        {
            var collectionReference = db.Collection("articles_WH01");
            var snapshot = collectionReference.GetSnapshotAsync().Result;
            var docs = snapshot.Documents;

            using (var w = new StreamWriter(@"D:\mass\tracker\document\download.csv"))
            {
                foreach (var doc in docs)
                {
                    var location = string.Join(",", doc.GetValue<List<string>>("LocationCode"));
                    var line = string.Format("{0},{1},{2},{3},{4},{5},{6},{7},{8}", doc.Id,
                        doc.GetValue<string>("Material").Replace(",",""),
                        doc.GetValue<string>("Name").Replace(",", ""),
                        doc.GetValue<string>("Brand").Replace(",", ""),
                        doc.GetValue<string>("Category").Replace(",", ""),
                        doc.GetValue<string>("FxCode").Replace(",", ""),
                        doc.GetValue<bool>("RTV").ToString(),
                        doc.GetValue<string>("Vendor_Name").Replace(",", ""),
                        location
                        );
                    w.WriteLine(line);
                    w.Flush();
                }
            }
        }


        public void AddDocument(List<CsvItem> items)
        {

            foreach (var item in items)
            {
                AddArticles(item);
                if (!string.IsNullOrEmpty(item.LocationCode1))
                    AddLocations(item);
            }
        }

        public void UpdateArticleBarCode(List<CsvItem> items)
        {

            foreach (var item in items)
            {
                try
                {
                    //Query materialQuery = db.Collection("articles_" + item.WHCode).WhereEqualTo("Material", item.Material);
                    var material = item.Material;
                    if (!string.IsNullOrEmpty(material))
                    {
                        Query materialQuery = db.Collection("articles_" + item.WHCode).WhereEqualTo("Material", item.Material);
                        QuerySnapshot materialSnapshot = materialQuery.GetSnapshotAsync().Result;
                        List<string> barcodes = materialSnapshot.Documents.Select(d => d.Id).ToList();
                        if (barcodes.Count > 1)
                        {
                            DocumentReference eanRef = db.Collection("articles_" + item.WHCode).Document(item.EAN);
                            barcodes.Remove(item.EAN);
                            barcodes.ForEach(b =>
                            {
                                var result = eanRef.UpdateAsync("BarCode", FieldValue.ArrayUnion(b)).Result;
                            });
                        }
                    }
                }
                catch (Exception) { }
            }

        }

        public void UpdateArticleLocationCode(List<CsvItem1> items)
        {

            foreach (var item in items)
            {
                try
                {

                    DocumentReference eanRef = db.Collection("articles_WH01").Document(item.EAN);
                    DocumentSnapshot snapshot = eanRef.GetSnapshotAsync().Result;
                    if (snapshot.Exists)
                    {
                        var locations = snapshot.GetValue<List<string>>("LocationCode");
                        if (locations.Count == 0)
                        {
                            var result = eanRef.UpdateAsync("LocationCode", FieldValue.ArrayUnion(item.LocationCode1)).Result;
                        }
                        else if(locations.FirstOrDefault()!= item.LocationCode1)
                        {
                            var result1 = eanRef.UpdateAsync("LocationCode", FieldValue.ArrayRemove(item.LocationCode1)).Result;
                            var result = eanRef.UpdateAsync("LocationCode", FieldValue.ArrayUnion(item.LocationCode1)).Result;
                        }
                    }

                }
                catch (Exception) { }
            }

        }

        public void GetArticleCount() {
            var collectionReference = db.Collection("articles_WH01");
            var snapshot = collectionReference.GetSnapshotAsync().Result;
            var a = snapshot.Count;
        }
        public void GetArticles()
        {
            DocumentReference docRef = db.Collection("articles_WH01").Document("9513355355183");
            DocumentSnapshot snapshot = docRef.GetSnapshotAsync().Result;
            if (snapshot.Exists)
            {
                Console.WriteLine("Document data for {0} document:", snapshot.Id);
                Dictionary<string, object> city = snapshot.ToDictionary();
                foreach (KeyValuePair<string, object> pair in city)
                {
                    Console.WriteLine("{0}: {1}", pair.Key, pair.Value);
                }
            }
            else
            {
                Console.WriteLine("Document {0} does not exist!", snapshot.Id);
            }

        }

        private void AddArticles(CsvItem item)
        {
            try
            {
                DocumentReference getdocRef = db.Collection("articles_" + item.WHCode).Document(item.EAN);
                DocumentSnapshot snapshot = getdocRef.GetSnapshotAsync().Result;
                if (snapshot.Exists)
                {
                    return;
                }
                DocumentReference docRef = db.Collection("articles_" + item.WHCode).Document(item.EAN);
                var itemModel = new ArticleModel()
                {
                    Material = item.Material,
                    Name = item.Name,
                    Category = item.Category,
                    RTV = item.RTV.ToUpper() == "RTV",
                    Vendor_Name = item.Vendor_Name,
                    Brand = item.Brand,
                    FxCode = item.FxCode,
                    LocationCode = new List<string>(),
                    BarCode = new List<string>() { item.EAN }
                };

                //Query materialQuery = db.Collection("articles_" + item.WHCode).WhereEqualTo("Material", item.Material);
                //QuerySnapshot materialSnapshot = materialQuery.GetSnapshotAsync().Result;
                //foreach (DocumentSnapshot documentSnapshot in materialSnapshot.Documents)
                //{
                //    itemModel.BarCode.Add(documentSnapshot.Id);
                //}  


                if (!string.IsNullOrEmpty(item.LocationCode1))
                    itemModel.LocationCode.Add(item.LocationCode1);

                if (!string.IsNullOrEmpty(item.LocationCode2))
                    itemModel.LocationCode.Add(item.LocationCode2);

                var result = docRef.SetAsync(itemModel).Result;
            }
            catch (Exception ex)
            {

            }
        }
        private void AddLocations(CsvItem item)
        {
            try
            {
                DocumentReference docRef = db.Collection("locations_" + item.WHCode).Document(item.LocationCode1);
                var itemModel = new LocationModel()
                {
                    Material = item.Material,
                    Name = item.Name,
                    Category = item.Category,
                    EAN = item.EAN 
                };

                docRef.SetAsync(itemModel).ConfigureAwait(true);
            }
            catch (Exception ex)
            {

            }
        }
    }
}
