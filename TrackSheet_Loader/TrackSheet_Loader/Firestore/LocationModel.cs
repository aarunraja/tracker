using Google.Cloud.Firestore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrackSheet_Loader
{
    [FirestoreData]
    public class LocationModel
    {
        [FirestoreProperty]
        public string Material { get; set; }
        [FirestoreProperty]
        public string Name { get; set; }
        [FirestoreProperty]
        public string Category { get; set; }
        [FirestoreProperty]
        public string EAN { get; set; }
    }
}
