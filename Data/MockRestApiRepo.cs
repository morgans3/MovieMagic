using System.IO;
using RestAPI.Models;
using Newtonsoft.Json;
using System.Linq;
using System;
using System.Collections;

namespace RestAPI.Data
{
    public class MockRestAPIRepo : IRestAPIRepo
    {
        public Movie[] GetAllCommands()
        {
            StreamReader r = File.OpenText("Data/moviedata.json");
            var json = r.ReadToEnd();
            Movie[] jss = JsonConvert.DeserializeObject<Movie[]>(json);
            return jss.Take(500).ToArray();
        }

        public Movie[] GetCommandsByProperty(string property, object value)
        {
            var _limit = 100;

            StreamReader r = File.OpenText("Data/moviedata.json");
            var json = r.ReadToEnd();
            Movie[] jss = JsonConvert.DeserializeObject<Movie[]>(json);
            if (property.Contains("info."))
            {
                var newproperty = property.Replace("info.", "");
                var response = jss.Where(c =>
                {
                    var prop = c.info.GetType().GetProperty(newproperty);
                    if (prop != null)
                    {
                        var data = prop.GetValue(c.info);
                        try
                        {
                            if (data is IList && data.GetType().IsGenericType)
                            {
                                IEnumerable enumerable = prop.GetValue(c.info) as IEnumerable;
                                bool flag = false;
                                if (enumerable != null)
                                {
                                    foreach (object element in enumerable)
                                    {
                                        if (element.ToString().Contains(value.ToString())) flag = true;
                                    }
                                }
                                return flag;
                            }
                        }
                        catch (Exception ex)
                        {
                            // this means that the object is not included in the info for all movies in the database
                            return false;
                        }
                        if (prop.GetValue(c.info) != null && value != null) return prop.GetValue(c.info).ToString().Contains(value.ToString());
                        return false;
                    }
                    return false;
                }).Take(_limit).ToArray();
                if (response.Length > 0) return response;
                return null;
            }

            var first = jss.Where(c =>
            {
                var prop = c.GetType().GetProperty(property);
                if (prop != null)
                {
                    return prop.GetValue(c).ToString().Contains(value.ToString());
                }
                return false;
            }).Take(_limit).ToArray();
            if (first.Length > 0) return first;
            return null;
        }

    }
}