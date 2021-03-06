const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

const latRange = [50.83, 52.45];
const lonRange = [-1.41, 0.81];

const cellTowerCSV = "./cell_towers_2020-01-13-T000000.csv";
fs.createReadStream(path.resolve(__dirname, "", cellTowerCSV))
  .pipe(csv.parse({ headers: true }))
  .on("error", error => console.error(error))
  .on("data", tower => {
    if (tower.lat > latRange[0] && tower.lat < latRange[1]) {
      if (tower.lon > lonRange[0] && tower.lon < lonRange[1]) {
        writeTower(tower);
      }
    }
  })
  .on("end", rowCount => {
    console.log(`Parsed ${rowCount} rows`);
  });


const writeTower = function(tower){
  let row = "\n";
  for(const t of Object.keys(tower)){
    row += tower[t] + ",";
  }

  console.log(row);
  fs.appendFileSync('towers.csv', row);
}