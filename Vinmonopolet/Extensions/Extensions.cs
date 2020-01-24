using System.Collections.Generic;
using System.Globalization;
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
            return int.TryParse(Regex.Match(value, @"\d+").Value, out var i) ? i : (int?) null;
        }

        public static decimal? ExtractDecimal(this string value)
        {
            var s = Regex.Split(value?.Replace(",", ".") ?? string.Empty, @"[^0-9\.]+").FirstOrDefault(c => c != "." && c.Trim() != "");
            return decimal.TryParse(s, out var i) ? i : (decimal?)null;
        }

        public static double? ExtractDouble(this string value)
        {
            var s = Regex.Split(value?.Replace(",", ".") ?? string.Empty, @"[^0-9\.]+").FirstOrDefault(c => c != "." && c.Trim() != "");
            return double.TryParse(s, out var i) ? i : (double?)null;
        }

        [CanBeNull]
        public static HtmlNode FirstElementWithClass(this HtmlNode node, string elementType, string className)
        {
            return node.Descendants(elementType).FirstOrDefault(x => x.GetAttributeValue("class", string.Empty) == className);
        }

        public static HtmlNode FirstElementWithId(this HtmlNode node, string id)
        {
            return node.Descendants().FirstOrDefault(x => x.GetAttributeValue("id", string.Empty) == id);
        }

        public static IEnumerable<HtmlNode> ElementsWithClass(this HtmlNode node, string elementType, string className)
        {
            return node.Descendants(elementType).Where(x => x.GetAttributeValue("class", string.Empty).Contains(className));
        }

        [CanBeNull]
        public static string FirstElementsAttributeValue(this HtmlNode node, string elementType, string attributeName)
        {
            return node.Descendants(elementType).FirstOrDefault()?.GetAttributeValue(attributeName, string.Empty);
        }

        [CanBeNull]
        public static HtmlNode SiblingOfElementStartingWithInnerText(this HtmlNode node, string elementType, string innerText)
        {
            var element = node.Descendants(elementType).FirstOrDefault(x => x.InnerText?.RemoveEmptyCharacters().StartsWith(innerText) ?? false);
            while (element?.NextSibling != null && element.NextSibling.NodeType == HtmlNodeType.Text)
            {
                element = element.NextSibling;
            }

            return element?.NextSibling;
        }

        [CanBeNull]
        public static HtmlNode ElementWithInnerText(this HtmlNode node, string elementType, string innerText)
        {
            return node.Descendants(elementType).FirstOrDefault(x => x.InnerText?.RemoveEmptyCharacters().StartsWith(innerText) ?? false);
        }

        public static string RemoveEmptyCharacters(this string value)
        {
            return Regex.Replace(value, @"\t|\n|\r", "").Trim();
        }

        public static string SafeSubstring(this string value, int length)
        {
            var s = value ?? string.Empty;
            return s.Substring(0, s.Length > length ? length : s.Length);
        }

        public static bool ContainsCaseInsensitive(this string str, string search)
        {
            return CultureInfo.InvariantCulture.CompareInfo.IndexOf(str, search, CompareOptions.IgnoreCase) >= 0;
        }
    }
}