using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using HtmlAgilityPack;
using JetBrains.Annotations;

namespace Vinmonopolet.Extensions
{
    public static class Extensions
    {
        public static int? ExtractInteger(this string value)
        {
            int i;
            return int.TryParse(Regex.Match(value, @"\d+").Value, out i) ? i : (int?) null;
        }

        public static decimal? ExtractDecimal(this string value)
        {
            decimal i;
            var s = Regex.Split(value?.Replace(",", ".") ?? string.Empty, @"[^0-9\.]+").FirstOrDefault(c => c != "." && c.Trim() != "");
            return decimal.TryParse(s, out i) ? i : (decimal?)null;
        }


        [CanBeNull]
        public static HtmlNode FirstElementWithClass(this HtmlNode node, string elementType, string className)
        {
            return node.Descendants(elementType).FirstOrDefault(x => x.GetAttributeValue("class", string.Empty) == className);
        }

        public static IEnumerable<HtmlNode> ElementsWithClass(this HtmlNode node, string elementType, string className)
        {
            return node.Descendants(elementType).Where(x => x.GetAttributeValue("class", string.Empty) == className);
        }

        [CanBeNull]
        public static string FirstElementsAttributeValue(this HtmlNode node, string elementType, string attributeName)
        {
            return node.Descendants(elementType).FirstOrDefault()?.GetAttributeValue(attributeName, string.Empty);
        }

        [CanBeNull]
        public static HtmlNode SiblingOfElementStartingWithInnerText(this HtmlNode node, string elementType, string innerText)
        {
            var element = node.Descendants(elementType).FirstOrDefault(x => x.InnerText?.StartsWith(innerText) ?? false);
            while (element?.NextSibling != null && element.NextSibling.NodeType == HtmlNodeType.Text)
            {
                element = element.NextSibling;
            }

            return element?.NextSibling;
        }


        public static string RemoveEmptyCharacters(this string value)
        {
            return Regex.Replace(value, @"\t|\n|\r", "").Trim();
        }
    }
}