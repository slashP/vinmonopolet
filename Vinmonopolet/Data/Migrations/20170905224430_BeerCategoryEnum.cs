using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Vinmonopolet.Data.Migrations
{
    public partial class BeerCategoryEnum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "BeerCategory",
                table: "WatchedBeers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_WatchedBeers_BeerCategory",
                table: "WatchedBeers",
                column: "BeerCategory");

            migrationBuilder.Sql("UPDATE WatchedBeers SET BeerCategory = 1  WHERE Type = 'Surøl'");
            migrationBuilder.Sql("UPDATE WatchedBeers SET BeerCategory = 2  WHERE Type = 'Barley wine'");
            migrationBuilder.Sql("UPDATE WatchedBeers SET BeerCategory = 3  WHERE Type = 'Brown ale'");
            migrationBuilder.Sql("UPDATE WatchedBeers SET BeerCategory = 4  WHERE Type = 'Hveteøl'");
            migrationBuilder.Sql("UPDATE WatchedBeers SET BeerCategory = 5  WHERE Type = 'India pale ale'");
            migrationBuilder.Sql("UPDATE WatchedBeers SET BeerCategory = 6  WHERE Type = 'Klosterstil'");
            migrationBuilder.Sql("UPDATE WatchedBeers SET BeerCategory = 7  WHERE Type = 'Lys ale'");
            migrationBuilder.Sql("UPDATE WatchedBeers SET BeerCategory = 8  WHERE Type = 'Porter & stout'");
            migrationBuilder.Sql("UPDATE WatchedBeers SET BeerCategory = 9  WHERE Type = 'Red/amber'");
            migrationBuilder.Sql("UPDATE WatchedBeers SET BeerCategory = 10 WHERE Type = 'Saison farmhouse ale'");
            migrationBuilder.Sql("UPDATE WatchedBeers SET BeerCategory = 11 WHERE Type = 'Spesial'");
            migrationBuilder.Sql("UPDATE WatchedBeers SET BeerCategory = 12 WHERE Type = 'Lys lager'");
            migrationBuilder.Sql("UPDATE WatchedBeers SET BeerCategory = 13 WHERE Type = 'Mørk lager'");
            migrationBuilder.Sql("UPDATE WatchedBeers SET BeerCategory = 14 WHERE Type = 'Pale ale'");
            migrationBuilder.Sql("UPDATE WatchedBeers SET BeerCategory = 15 WHERE Type = 'Scotch ale'");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_WatchedBeers_BeerCategory",
                table: "WatchedBeers");

            migrationBuilder.DropColumn(
                name: "BeerCategory",
                table: "WatchedBeers");
        }
    }
}
