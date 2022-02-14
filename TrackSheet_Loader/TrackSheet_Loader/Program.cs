using CsvHelper;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

namespace TrackSheet_Loader
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                //var item = ReadCSVFile(@"D:\mass\tracker\document\Location_Update.csv");

                //new Loader().AddDocument(item);
                //new Loader().UpdateArticleBarCode(item);
                //new Loader().UpdateArticleLocationCode(item);
            }
            catch (Exception ex)
            { }
            new Loader().DownloadData();
            //new Loader().GetArticles();
            //new Loader().GetArticleCount();
            Console.WriteLine("Hello World!");
        }

        public static List<CsvItem> ReadCSVFile(string location)
        {
            try
            {
                using (var reader = new StreamReader(location, Encoding.Default))
                using (var csv = new CsvReader(reader))
                {
                    csv.Configuration.RegisterClassMap<CsvItemMapper>();
                    csv.Configuration.MissingFieldFound = null;
                    var records = csv.GetRecords<CsvItem>().ToList();
                    return records;
                }
            }
            catch (Exception e)
            {
                throw new Exception(e.Message);
            }
        }



    }
}
