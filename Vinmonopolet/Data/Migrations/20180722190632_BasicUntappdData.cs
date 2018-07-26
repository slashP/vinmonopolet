using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Vinmonopolet.Data.Migrations
{
    public partial class BasicUntappdData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UntappdId",
                table: "WatchedBeers",
                type: "nvarchar(32)",
                maxLength: 32,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UntappdBeers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Abv = table.Column<double>(type: "float", nullable: false),
                    AverageScore = table.Column<double>(type: "float", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    FullJson = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ibu = table.Column<double>(type: "float", nullable: false),
                    LabelUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MonthlyCheckins = table.Column<int>(type: "int", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Ratings = table.Column<int>(type: "int", nullable: false),
                    Slug = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Style = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    TotalCheckins = table.Column<int>(type: "int", nullable: false),
                    TotalUserCount = table.Column<int>(type: "int", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UntappdBeers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "UntappdBreweries",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Country = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LabelUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Slug = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UntappdBreweries", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UntappdBeers_Id",
                table: "UntappdBeers",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_UntappdBreweries_Id",
                table: "UntappdBreweries",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UntappdBeers");

            migrationBuilder.DropTable(
                name: "UntappdBreweries");

            migrationBuilder.DropColumn(
                name: "UntappdId",
                table: "WatchedBeers");
        }
    }
}
