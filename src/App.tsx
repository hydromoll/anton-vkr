// import React, { useState } from 'react';

// interface Detail {
//   width: number;
//   height: number;
// }

// interface Sheet {
//   width: number;
//   height: number;
// }
// interface Cell {
//   remainingSpace: number;
//   previousDetailIndex?: number;
//   previousSheetIndex?: number;
// }

// const App = () => {
//   const [details, setDetails] = useState<Detail[]>([
//     { width: 10, height: 5 },
//     { width: 20, height: 10 },
//     { width: 15, height: 8 },
//   ]);

//   const [sheets, setSheets] = useState<Sheet[]>([
//     { width: 50, height: 30 },
//   ]);

//   const [result, setResult] = useState<[Detail, Sheet][]>([]);

//   const calculateCutting = () => {
//     const table: Cell[][] = [];
//     const m = details.length;
//     const n = sheets.length;

//     for (let i = 0; i <= m; i++) {
//       table[i] = [];
//       for (let j = 0; j <= n; j++) {
//         table[i][j] = { remainingSpace: Number.MAX_VALUE };
//       }
//     }

//     for (let i = 0; i <= m; i++) {
//       table[i][0].remainingSpace = 0;
//     }

//     for (let i = 1; i <= m; i++) {
//       for (let j = 1; j <= n; j++) {
//         for (let k = 0; k < i; k++) {
//           const remainingSpace =
//             table[k][j - 1].remainingSpace +
//             Math.max(details[i - 1].width - sheets[j - 1].width, 0);
//           if (remainingSpace < table[i][j].remainingSpace) {
//             table[i][j] = {
//               remainingSpace,
//               previousDetailIndex: k,
//               previousSheetIndex: j - 1,
//             };
//           }
//         }
//       }
//     }

//     let minRemainingSpace = Number.MAX_VALUE;
//     let lastDetailIndex = -1;
//     for (let i = 1; i <= m; i++) {
//       if (table[i][n].remainingSpace < minRemainingSpace) {
//         minRemainingSpace = table[i][n].remainingSpace;
//         lastDetailIndex = i;
//       }
//     }

//     const result2: [Detail, Sheet][] = [];
//     let currentDetailIndex = lastDetailIndex;
//     let currentSheetIndex = n;
//     while (currentSheetIndex > 0) {
//       const previousDetailIndex = table[currentDetailIndex][currentSheetIndex]
//         .previousDetailIndex;
//       const previousSheetIndex = table[currentDetailIndex][currentSheetIndex]
//         .previousSheetIndex;

//       if (previousDetailIndex !== undefined) {
//         const detail = details[previousDetailIndex];
//         const sheet = sheets[currentSheetIndex - 1];
//         result2.unshift([detail, sheet]);
//       }

//       currentDetailIndex = previousDetailIndex;
//       currentSheetIndex = previousSheetIndex || 0;
//     }
//     setResult(result2)
//     console.log(result2);
//   };

//   return (
//     <div>
//       <button onClick={calculateCutting}>Calculate Cutting</button>
//       {result.length > 0 && (
//         <div>
//           <h2>Cutting Result</h2>

//           {sheets.map((sheet, sheetIndex) => (
//             <div key={sheetIndex} className="sheet">
//               <p>Sheet: {sheet.width}</p>

//               <div className="detail-container">
//                 {result
//                   .filter(([_, selectedSheet]) => selectedSheet === sheet)
//                   .map(([detail], detailIndex) => (
//                     <div
//                       key={detailIndex}
//                       className="detail"
//                       style={{ width: `${detail.width}px` }}
//                     >
//                       {detail.width}
//                     </div>
//                   ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useState } from "react";

interface Detail {
  width: number;
  height: number;
}

interface Sheet {
  width: number;
  height: number;
}

const App = () => {
  const [details, setDetails] = useState<Detail[]>([
    { width: 100, height: 50 },
    { width: 100, height: 50 },
    { width: 100, height: 50 },
    { width: 100, height: 50 },
    { width: 100, height: 50 },
    { width: 100, height: 60 },
    { width: 100, height: 60 },
    { width: 100, height: 60 },
    { width: 100, height: 60 },
    { width: 100, height: 60 },
    { width: 100, height: 60 },
    { width: 100, height: 60 },
  ]);

  const [sheet, setSheet] = useState<Sheet>({ width: 500, height: 180 });
  // const [result, setResult] = useState<[Detail, Sheet][]>([]);
  const [positions, setPositions] = useState<{ left: number; top: number }[]>(
    []
  );
  const [calcScale, setCaclScale] = useState<number>(0);

  const calculateCutting = () => {
    const sortedDetails = [...details].sort((a, b) => a.height - b.height); // Sort details in ascending order of height

    const positions: { left: number; top: number }[] = [];
    const remainingWidths: number[] = [sheet.width];
    const remainingHeights: number[] = [sheet.height];

    sortedDetails.forEach((detail, index) => {
      let bestFitIndex = -1;
      let bestFitWidth = sheet.width + 1;
      let bestFitHeight = sheet.height + 1;

      for (let i = 0; i < remainingWidths.length; i++) {
        if (
          detail.width <= remainingWidths[i] &&
          detail.height <= remainingHeights[i]
        ) {
          const widthDifference = remainingWidths[i] - detail.width;
          const heightDifference = remainingHeights[i] - detail.height;

          if (
            heightDifference < bestFitHeight ||
            (heightDifference === bestFitHeight &&
              widthDifference < bestFitWidth)
          ) {
            bestFitIndex = i;
            bestFitHeight = heightDifference;
            bestFitWidth = widthDifference;

            if (heightDifference === 0 && widthDifference === 0) {
              break; // Found an exact fit, no need to continue searching
            }
          }
        }
      }

      if (bestFitIndex !== -1) {
        const position = {
          left: sheet.width - remainingWidths[bestFitIndex] - 1,
          top: sheet.height - remainingHeights[bestFitIndex] - 1,
        };
        positions[index] = position;

        remainingWidths[bestFitIndex] -= detail.width;
        remainingHeights[bestFitIndex] -= detail.height;
      } else {
        // Create a new sheet if the current detail couldn't fit in any existing sheet
        positions[index] = { left: 0, top: sheet.height };
        remainingWidths.push(sheet.width - detail.width);
        remainingHeights.push(sheet.height - detail.height);
      }
    });

    const sortedPositions = [...positions].sort((a, b) => {
      const detailA = sortedDetails[positions.indexOf(a)];
      const detailB = sortedDetails[positions.indexOf(b)];
      return detailB.height - detailA.height;
    });

    setPositions(sortedPositions);
  };

  return (
    <div>
      <button onClick={calculateCutting}>Calculate Cutting</button>

      {positions.length > 0 && (
        <div>
          <h2>Cutting Result</h2>

          <div
            className="sheet"
            style={{
              width: `${sheet.width}px`,
              height: `${sheet.height}px`,
              backgroundColor: "purple",
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
            }}
          >
            {positions.map((position, index) => (
              <div
                key={index}
                className="detail"
                style={{
                  width: `${details[index].width}px`,
                  height: `${details[index].height}px`,
                  left: `${position.left}px`,
                  top: `${position.top - 10}px`,
                  backgroundColor: colors[index % 2] || "blue",
                  textAlign: "center",
                }}
              >
                {details[index].width} x {details[index].height}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default App;

const colors = ["red", "blue", "green", "yellow"];

// backgroundColor: colors[index] || "blue",
