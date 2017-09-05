using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Vinmonopolet.Data.Migrations
{
    public partial class AnnouncedDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "AnnouncedDate",
                table: "BeerLocations",
                type: "datetime2",
                nullable: true);
            migrationBuilder.Sql("UPDATE BeerLocations SET AnnouncedDate = '2017-08-17' WHERE StockStatus = 3");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AnnouncedDate",
                table: "BeerLocations");
        }
    }
}
