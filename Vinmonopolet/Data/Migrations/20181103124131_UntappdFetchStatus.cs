using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Vinmonopolet.Data.Migrations
{
    public partial class UntappdFetchStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsHumanlyVerified",
                table: "WatchedBeers");

            migrationBuilder.AddColumn<int>(
                name: "UntappdFetchStatus",
                table: "WatchedBeers",
                type: "int",
                nullable: false,
                defaultValue: 0);
            migrationBuilder.Sql("UPDATE dbo.WatchedBeers SET UntappdFetchStatus = 2 WHERE UntappdId IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UntappdFetchStatus",
                table: "WatchedBeers");

            migrationBuilder.AddColumn<bool>(
                name: "IsHumanlyVerified",
                table: "WatchedBeers",
                nullable: false,
                defaultValue: false);
        }
    }
}
