namespace Vinmonopolet.Web.Models.UntappdData.ApiDtos;

public class ResponseTime
{
    public double time { get; set; }
    public string measure { get; set; }
}

public class InitTime
{
    public int time { get; set; }
    public string measure { get; set; }
}

public class Meta
{
    public int code { get; set; }
    public ResponseTime response_time { get; set; }
    public InitTime init_time { get; set; }
}

public class Stats
{
    public int total_count { get; set; }
    public int monthly_count { get; set; }
    public int total_user_count { get; set; }
    public int user_count { get; set; }
}

public class Contact
{
    public string twitter { get; set; }
    public string facebook { get; set; }
    public string url { get; set; }
}

public class Location
{
    public string brewery_city { get; set; }
    public string brewery_state { get; set; }
    public double lat { get; set; }
    public double lng { get; set; }
}

public class Brewery
{
    public string brewery_id { get; set; }
    public string brewery_name { get; set; }
    public string brewery_slug { get; set; }
    public string brewery_type { get; set; }
    public string brewery_page_url { get; set; }
    public string brewery_label { get; set; }
    public string country_name { get; set; }
    public Contact contact { get; set; }
    public Location location { get; set; }
    public string brewery_description { get; set; }
}

public class Vintages
{
    public int count { get; set; }
    public List<object> items { get; set; }
}

public class Beer
{
    public string bid { get; set; }
    public string beer_name { get; set; }
    public string beer_label { get; set; }
    public string beer_label_hd { get; set; }
    public double beer_abv { get; set; }
    public int beer_ibu { get; set; }
    public string beer_description { get; set; }
    public string beer_style { get; set; }
    public int is_in_production { get; set; }
    public string beer_slug { get; set; }
    public int is_homebrew { get; set; }
    public string created_at { get; set; }
    public int rating_count { get; set; }
    public double rating_score { get; set; }
    public Stats stats { get; set; }
    public Brewery brewery { get; set; }
    public int auth_rating { get; set; }
    public bool wish_list { get; set; }
    public double weighted_rating_score { get; set; }
    public Vintages vintages { get; set; }
}

public class Response
{
    public Beer beer { get; set; }
}

public class BeerInfo_Compact
{
    public Meta meta { get; set; }
    public List<object> notifications { get; set; }
    public Response response { get; set; }
}