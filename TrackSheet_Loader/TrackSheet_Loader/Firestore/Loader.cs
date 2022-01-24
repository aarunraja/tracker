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
            //GoogleCredential cred = GoogleCredential.FromFile("JsonCredentials.json");

            string filepath = "JsonCredentials.json";
            Environment.SetEnvironmentVariable("GOOGLE_APPLICATION_CREDENTIALS", filepath);

            //var jsonString = File.ReadAllText("JsonCredentials.json");
            //var builder = new FirestoreClientBuilder() { JsonCredentials = jsonString };
            //FirestoreDb db = FirestoreDb.Create("my-project", builder.Build());

            db = FirestoreDb.Create("mylearning-986f3");

        }


        public void AddDocument(List<CsvItem> items)
        {

            foreach (var item in items)
            {
                //AddArticles(item);
                if (!string.IsNullOrEmpty(item.LocationCode1))
                    AddLocations(item);
            }
        }

        private void AddArticles(CsvItem item)
        {
            try
            {
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
                    LocationCode = new List<string>()
                };
                if (!string.IsNullOrEmpty(item.LocationCode1))
                    itemModel.LocationCode.Add(item.LocationCode1);

                if (!string.IsNullOrEmpty(item.LocationCode2))
                    itemModel.LocationCode.Add(item.LocationCode2);

                docRef.SetAsync(itemModel).ConfigureAwait(true);
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
                    EAN = new List<string>() {item.EAN }
                };
                
                docRef.SetAsync(itemModel).ConfigureAwait(true);
            }
            catch (Exception ex)
            {

            }
        }
    }
}
