using Microsoft.EntityFrameworkCore.Migrations;

namespace Vinmonopolet.Data.Migrations
{
    public partial class AddVinmonopoletStatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "VinmonopoletStatus",
                table: "WatchedBeers",
                maxLength: 64,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "VinmonopoletStatus",
                table: "WatchedBeers");
        }
    }
}
