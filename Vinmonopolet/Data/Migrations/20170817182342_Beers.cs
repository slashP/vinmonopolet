using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace Vinmonopolet.Data.Migrations
{
    public partial class Beers : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Stores",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stores", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "WatchedBeers",
                columns: table => new
                {
                    MaterialNumber = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    AlcoholPercentage = table.Column<decimal>(type: "decimal(18, 2)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Price = table.Column<decimal>(type: "decimal(18, 2)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WatchedBeers", x => x.MaterialNumber);
                });

            migrationBuilder.CreateTable(
                name: "BeerLocations",
                columns: table => new
                {
                    StoreId = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    WatchedBeerId = table.Column<string>(type: "nvarchar(32)", maxLength: 32, nullable: false),
                    StockLevel = table.Column<int>(type: "int", nullable: false),
                    StockStatus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BeerLocations", x => new { x.StoreId, x.WatchedBeerId });
                    table.ForeignKey(
                        name: "FK_BeerLocations_Stores_StoreId",
                        column: x => x.StoreId,
                        principalTable: "Stores",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_BeerLocations_WatchedBeers_WatchedBeerId",
                        column: x => x.WatchedBeerId,
                        principalTable: "WatchedBeers",
                        principalColumn: "MaterialNumber",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_BeerLocations_WatchedBeerId",
                table: "BeerLocations",
                column: "WatchedBeerId");

            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('114', 'Oslo, Aker Brygge', 1)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('141', 'Oslo, Rosenkrantzgt.', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('286', 'Oslo, Steen & Strøm', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('104', 'Oslo, Briskeby', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('118', 'Oslo, Oslo S', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('143', 'Oslo, Oslo City', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('144', 'Oslo, Thereses gate', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('115', 'Oslo, Grünerløkka', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('361', 'Oslo, Grønland Basar', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('136', 'Oslo, Majorstuen', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('178', 'Oslo, Kiellandsplass', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('393', 'Oslo, Skøyen', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('454', 'Oslo, Vinderen', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('152', 'Oslo, Sandaker', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('182', 'Oslo, Hasle Torg', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('334', 'Oslo, Ullevaal Stadion', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('417', 'Oslo, Nydalen', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('161', 'Oslo, Storo', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('127', 'Oslo, CC Vest', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('138', 'Oslo, Manglerud', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('442', 'Bærum Fornebu', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('374', 'Oslo, Lambertseter', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('335', 'Oslo, Røa', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('145', 'Oslo, Tveita', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('134', 'Nesodden', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('117', 'Oslo, Alna', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('132', 'Oslo, Linderud', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('440', 'Oslo, Bøler', 0)");
            migrationBuilder.Sql("INSERT INTO Stores (Id, Name, IsActive) VALUES ('198', 'Bærum, Østerås', 0)");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BeerLocations");

            migrationBuilder.DropTable(
                name: "Stores");

            migrationBuilder.DropTable(
                name: "WatchedBeers");
        }
    }
}
