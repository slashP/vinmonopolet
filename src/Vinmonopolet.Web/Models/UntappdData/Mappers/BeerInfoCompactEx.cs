using Vinmonopolet.Web.Models.UntappdData.ApiDtos;

namespace Vinmonopolet.Web.Models.UntappdData.Mappers;

public static class BeerInfoCompactEx
{
    public static BasicBeer ToBasicBeer(this BeerInfo_Compact info)
    {
        var beer = info.response.beer;
        return new BasicBeer
        {
            UpdatedAt = DateTime.Now,
            Id = beer.bid,
            Name = beer.beer_name,
            LabelUrl = beer.beer_label,
            Style = beer.beer_style,
            Abv = beer.beer_abv,
            Ibu = beer.beer_ibu,
            Ratings = beer.rating_count,
            AverageScore = beer.rating_score,
            TotalCheckins = beer.stats.total_count,
            MonthlyCheckins = beer.stats.monthly_count,
            TotalUserCount = beer.stats.total_user_count,
            Description = beer.beer_description,
            Slug = beer.beer_slug
        };
    }

    public static Brewery ToBrewery(this BeerInfo_Compact info)
    {
        var brewery = info.response.beer.brewery;
        return new Brewery
        {
            Id = brewery.brewery_id,
            Name = brewery.brewery_name,
            Slug = brewery.brewery_slug,
            Url = brewery.brewery_page_url,
            LabelUrl = brewery.brewery_label,
            Country = brewery.country_name
        };
    }
}