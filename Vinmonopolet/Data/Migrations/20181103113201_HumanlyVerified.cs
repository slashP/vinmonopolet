using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Vinmonopolet.Data.Migrations
{
    public partial class HumanlyVerified : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsHumanlyVerified",
                table: "WatchedBeers",
                type: "bit",
                nullable: false,
                defaultValue: false);
            migrationBuilder.Sql("UPDATE dbo.WatchedBeers SET IsHumanlyVerified = 1 WHERE UntappdId IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsHumanlyVerified",
                table: "WatchedBeers");
        }
    }
}
