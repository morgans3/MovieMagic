using System;
using System.Collections.Generic;

namespace RestAPI.Dtos
{
    public class MovieReadDto
    {
        public int year { get; set; }
        public string title { get; set; }
        public InfoReadDto info { get; set; }
    }

    public class InfoReadDto
    {
        public List<string> directors { get; set; }
        public DateTime release_date { get; set; }
        public double rating { get; set; }
        public List<string> genres { get; set; }
        public string image_url { get; set; }
        public string plot { get; set; }
        public int rank { get; set; }
        public int running_time_secs { get; set; }
        public List<string> actors { get; set; }
    }
}