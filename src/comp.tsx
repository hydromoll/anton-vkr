import React, { useState } from 'react';

interface Detail {
  width: number;
  height: number;
}

interface Sheet {
  width: number;
  height: number;
}


// Example usage
const exDetails: Detail[] = [
    { width: 10, height: 5 },
    { width: 7, height: 3 },
    { width: 4, height: 8 },
  ];
  const exSheets: Sheet[] = [
    { width: 20, height: 10 },
    { width: 15, height: 8 },
  ];
  

const LinearCutting: React.FC = () => {
  const [details, setDetails] = useState<Detail[]>(exDetails);

  const [sheets, setSheets] = useState<Sheet[]>(exSheets);

  const [linearCutting, setLinearCutting] = useState<number[]>([]);

//   const calculateLinearCutting = () => {
//     const M = details.length;
//     const N = sheets.length;
//     const table = [];

//     // Step 1: Create table with initial values
//     for (let i = 0; i < M; i++) {
//       table[i] = [];
//       for (let j = 0; j < N; j++) {
//         table[i][j] = Number.MAX_SAFE_INTEGER;
//       }
//     }

//     // Step 2: Fill table with minimum remaining space
//     for (let i = 0; i < M; i++) {
//       for (let j = 0; j < N; j++) {
//         for (let k = 0; k <= i; k++) {
//           for (let l = 0; l <= j; l++) {
//             const remainingWidth = sheets[l].width - details[k].width;
//             const remainingHeight = sheets[l].height - details[k].height;
//             if (remainingWidth >= 0 && remainingHeight >= 0) {
//               const remainingSpace =
//                 (remainingWidth === 0 ? 0 : remainingWidth + table[k][l]) +
//                 (remainingHeight === 0 ? 0 : remainingHeight + table[i - k - 1][j - l]);
//               table[i][j] = Math.min(table[i][j], remainingSpace);
//             }
//           }
//         }
//       }
//     }

//     // Step 3: Find optimal solution
//     let minRemainingSpace = Number.MAX_SAFE_INTEGER;
//     for (let j = 0; j < N; j++) {
//       minRemainingSpace = Math.min(minRemainingSpace, table[M - 1][j]);
//     }

//     // Step 4: Calculate linear cutting
//     const linearCuttingResult = [];
//     let remainingSpace = minRemainingSpace;
//     for (let i = M - 1; i >= 0; i--) {
//       let j = N - 1;
//       while (j >= 0 && table[i][j] > remainingSpace) {
//         j--;
//       }
//       if (j < 0) {
//         throw new Error('No solution found');
//       }
//       linearCuttingResult.unshift(j);
//       remainingSpace -= table[i][j];
//     }

//     setLinearCutting(linearCuttingResult);
//   };

function calculateLinearCutting(): number[] {
    const M = details.length;
  const N = sheets.length;
  const table: number[][] = [];

  // Step 1: Create table with initial values
  for (let i = 0; i < M; i++) {
    table[i] = [];
    for (let j = 0; j < N; j++) {
      table[i][j] = Number.MAX_SAFE_INTEGER;
    }
  }

  // Step 2: Fill table with minimum remaining space
  for (let i = 0; i < M; i++) {
    for (let j = 0; j < N; j++) {
      for (let k = 0; k <= i; k++) {
        for (let l = 0; l <= j; l++) {
          const remainingWidth = sheets[l].width - details[k].width;
          const remainingHeight = sheets[l].height - details[k].height;
          if (remainingWidth >= 0 && remainingHeight >= 0) {
            const remainingSpace =
              (remainingWidth === 0 ? 0 : remainingWidth + table[k][l]) +
              (remainingHeight === 0 ? 0 : remainingHeight + (i - k - 1 >= 0 && j - l >= 0 ? table[i - k - 1][j - l] : 0));
            table[i][j] = Math.min(table[i][j], remainingSpace);
          }
        }
      }
    }
  }
  
    // Step 3: Find optimal solution
    let minRemainingSpace = Number.MAX_SAFE_INTEGER;
    for (let j = 0; j < N; j++) {
      minRemainingSpace = Math.min(minRemainingSpace, table[M - 1][j]);
    }
  
    // Step 4: Calculate linear cutting
    const linearCuttingResult: number[] = [];
    let remainingSpace = minRemainingSpace;
    for (let i = M - 1; i >= 0; i--) {
      let j = N - 1;
      while (j >= 0 && table[i][j] > remainingSpace) {
        j--;
      }
      if (j < 0) {
        throw new Error("No solution found");
      }
      linearCuttingResult.unshift(j);
      remainingSpace -= table[i][j];
    }
    console.log("res =>",linearCuttingResult)
    setLinearCutting(linearCuttingResult);
    return linearCutting
  }

  return (
    <div className="App">
      <h1>Linear Cutting {JSON.stringify(linearCutting)}</h1>
      <button onClick={calculateLinearCutting}>Calculate</button>
      <div className="container">
        {sheets.map((sheet, sheetIndex) => (
          <div className="sheet" key={sheetIndex}>
            <h2 className="sheet-title">Sheet {sheetIndex}</h2>
            {linearCutting.map((detailIndex, index) =>
              detailIndex === sheetIndex ? (
                <div className="detail" key={index}>
                  <p className="detail-title">Detail {detailIndex}</p>
                  <p className="detail-dimensions">
                    Width: {details[detailIndex].width}, Height: {details[detailIndex].height}
                  </p>
                </div>
              ) : null
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LinearCutting;








// interface Detail {
//     width: number;
//     height: number;
//   }
  
//   interface Sheet {
//     width: number;
//     height: number;
//   }
  
//   function calculateLinearCutting(details: Detail[], sheets: Sheet[]): number[] {
//     const M = details.length;
//     const N = sheets.length;
//     const table: number[][] = [];
  
//     // Step 1: Create table with initial values
//     for (let i = 0; i < M; i++) {
//       table[i] = [];
//       for (let j = 0; j < N; j++) {
//         table[i][j] = Number.MAX_SAFE_INTEGER;
//       }
//     }
  
//     // Step 2: Fill table with minimum remaining space
//     for (let i = 0; i < M; i++) {
//       for (let j = 0; j < N; j++) {
//         for (let k = 0; k <= i; k++) {
//           for (let l = 0; l <= j; l++) {
//             const remainingWidth = sheets[l].width - details[k].width;
//             const remainingHeight = sheets[l].height - details[k].height;
//             if (remainingWidth >= 0 && remainingHeight >= 0) {
//               const remainingSpace =
//                 (remainingWidth === 0 ? 0 : remainingWidth + table[k][l]) +
//                 (remainingHeight === 0 ? 0 : remainingHeight + table[i - k - 1][j - l]);
//               table[i][j] = Math.min(table[i][j], remainingSpace);
//             }
//           }
//         }
//       }
//     }
  
//     // Step 3: Find optimal solution
//     let minRemainingSpace = Number.MAX_SAFE_INTEGER;
//     for (let j = 0; j < N; j++) {
//       minRemainingSpace = Math.min(minRemainingSpace, table[M - 1][j]);
//     }
  
//     // Step 4: Calculate linear cutting
//     const linearCutting: number[] = [];
//     let remainingSpace = minRemainingSpace;
//     for (let i = M - 1; i >= 0; i--) {
//       let j = N - 1;
//       while (j >= 0 && table[i][j] > remainingSpace) {
//         j--;
//       }
//       if (j < 0) {
//         throw new Error("No solution found");
//       }
//       linearCutting.unshift(j);
//       remainingSpace -= table[i][j];
//     }
  
//     return linearCutting;
//   }
  
//   // Example usage
//   const details: Detail[] = [
//     { width: 10, height: 5 },
//     { width: 7, height: 3 },
//     { width: 4, height: 8 },
//   ];
//   const sheets: Sheet[] = [
//     { width: 20, height: 10 },
//     { width: 15, height: 8 },
//   ];
//   const linearCutting = calculateLinearCutting(details, sheets);
//   console.log(linearCutting); // Output: [1, 0, 0] (corresponding to sheets[1], sheets[0], sheets[0])