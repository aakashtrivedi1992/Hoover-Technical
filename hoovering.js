const fs = require('fs');

// Room coordinates
let roomX = 0;
let roomY = 0;

// Hoover coordinates
let hoovX = 0;
let hoovY = 0;

// Array of dirt patches. Represented as an array of objects (to be filled in after file reading)
let dirtPatches = [];

// Number of patches hoovered
let patchesHoovered = 0;


// The list of directions represented as a string (to be populated after file reading)
let directions = "";

let i = 0;


// Using File System module, reads the file line by line and converts to an array of strings
let fileLineArray = fs.readFileSync(process.cwd() + "/input.txt").toString().split("\n");

// Iterate through the array and assign values to variables
for (i = 0; i < fileLineArray.length; i++) {
   if (i == 0) {
      // First line is room coordinates
      roomX = parseInt(fileLineArray[0][0]);
      roomY = parseInt(fileLineArray[0][2]);
   }

   else if (i == 1) {
      // Second line is hoover coordinates
      hoovX = parseInt(fileLineArray[1][0]);
      hoovY = parseInt(fileLineArray[1][2]);
   }

   else if (i + 1 == fileLineArray.length) {
      // Last line is directions
      directions = fileLineArray[i];
   }

   else {
      // Any other index is a dirt patch coordinate
      let xValue = parseInt(fileLineArray[i][0]);
      let yValue = parseInt(fileLineArray[i][2]);
      dirtPatches.push({x: xValue, y: yValue});
   }
}


// Iterate through each direction and move accordingly
for (i = 0; i < directions.length; i++) {
   let moved = false;
   // Depending on the direction given, check whether the changing coordinates are within the bounds of the grid.
   // If so, increase/decrease accordingly and set moved flag to true.
   // If not, nothing happens, move on.
   if (directions.charAt(i) == 'N') {
      if (hoovY + 1 <= roomY) {
         hoovY = hoovY + 1;
         moved = true;
      }
   }
   
   else if (directions.charAt(i) == 'S') {
      if (hoovY - 1 >= 0) {
         hoovY = hoovY - 1;
         moved = true;
      }
   }
   
   else if (directions.charAt(i) == 'E') {
      if (hoovX + 1 <= roomX) {
         hoovX = hoovX + 1;
         moved = true;
      }
   }
   
   else if (directions.charAt(i) == 'W') {
      if (hoovX - 1 >= 0) {
         hoovX = hoovX - 1;
         moved = true;
      }
   }


   // If the hoover moved, there may be a chance that it moved over a dirt patch.
   // If the hoover didn't move, there is no need for this condition to execute
   if (moved) {
      // Flag to make sure that a patch was hoovered and will be removed from the dirtPatches array
      let deleted = false;
      let j = 0;
      
      // Every time a patch gets hoovered, increase the count and remove the coordinates from the dirtPatches
      // array. That way, if the hoover happens to goes over an already cleaned patch, it won't double count it.
      while (!deleted && j < dirtPatches.length) {
         // Check whether the coordinates of the hoover match the dirtPatches coordinates
         if ((dirtPatches[j].x == hoovX) && (dirtPatches[j].y == hoovY)) {
            patchesHoovered++;
            // Once a patch has been hoovered, remove the coordinates from the array
            dirtPatches.splice(j, 1);
            
            deleted = true;
         }

         j++;
         
      }
   }
}

console.log(`${hoovX}  ${hoovY}`);
console.log(patchesHoovered);
