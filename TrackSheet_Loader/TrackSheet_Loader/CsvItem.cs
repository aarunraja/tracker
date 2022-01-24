using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrackSheet_Loader
{
    public class CsvItem
    {
        public string WHCode { get; set; }
        public string EAN { get; set; }
        public string Material { get; set; }
        public string Name { get; set; }
        public string Category { get; set; }
        public string RTV { get; set; }
        public string Vendor_Name { get; set; }
        public string Brand { get; set; }
        public string FxCode { get; set; }
        public string LocationCode1 { get; set; }
        public string LocationCode2 { get; set; }
        public string LocationCode3 { get; set; }
    }
}
