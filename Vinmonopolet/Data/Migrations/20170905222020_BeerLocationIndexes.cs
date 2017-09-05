using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Vinmonopolet.Data.Migrations
{
    public partial class BeerLocationIndexes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_BeerLocations_AnnouncedDate",
                table: "BeerLocations",
                column: "AnnouncedDate");

            migrationBuilder.CreateIndex(
                name: "IX_BeerLocations_StockStatus",
                table: "BeerLocations",
                column: "StockStatus");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_BeerLocations_AnnouncedDate",
                table: "BeerLocations");

            migrationBuilder.DropIndex(
                name: "IX_BeerLocations_StockStatus",
                table: "BeerLocations");
        }
    }
}
