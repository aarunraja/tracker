using CsvHelper.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TrackSheet_Loader
{
    public class CsvItemMapper : ClassMap<CsvItem>
    {
        public CsvItemMapper()
        {
            Map(m => m.WHCode).Name("WH CODE");
            Map(m => m.EAN).Name("EAN");
            Map(m => m.Material).Name("Material");
            Map(m => m.Name).Name("NAME");
            Map(m => m.Category).Name("CATEGORY");
            Map(m => m.RTV).Name("NRTV");
            Map(m => m.Vendor_Name).Name("VENDOR NAME");
            Map(m => m.Brand).Name("BRAND");
            Map(m => m.FxCode).Name("FX Code");
            Map(m => m.LocationCode1).Name("Current Loc- 1");
            Map(m => m.LocationCode2).Name("Current Loc- 2");
            //Map(m => m.LocationCode3).Name("Current Loc- 3");
        }
    }
}
