using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrackSheet_Loader
{
    [FirestoreData]
    public class ArticleModel
    {
        [FirestoreProperty]
        public string Material { get; set; }
        [FirestoreProperty]
        public string Name { get; set; }
        [FirestoreProperty]
        public string Category { get; set; }
        [FirestoreProperty]
        public bool RTV { get; set; }
        [FirestoreProperty]
        public string Vendor_Name { get; set; }
        [FirestoreProperty]
        public string Brand { get; set; }
        [FirestoreProperty]
        public string FxCode { get; set; }
        [FirestoreProperty]
        public List<string> BarCode { get; set; }
        [FirestoreProperty]
        public List<string> LocationCode { get; set; }
    }
}
