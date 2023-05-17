// const containers = [{ width: 500, height: 300 }];
// const elements = [
//   { width: 100, height: 50 },
//   { width: 200, height: 100 },
//   { width: 150, height: 150 },
//   { width: 150, height: 150 },
//   { width: 150, height: 150 },
//   { width: 150, height: 150 },
//   { width: 150, height: 150 },
//   { width: 150, height: 150 },
//   { width: 80, height: 60 },
//   { width: 120, height: 80 },
//   { width: 120, height: 80 },
//   { width: 120, height: 80 },
//   { width: 50, height: 80 },
//   { width: 30, height: 80 },
// ];

// const calculateLayout = () => {
//   const sortedByHeightElements = elements.sort((a, b) => a.height - b.height);
//   const containers = [{ width: 500, height: 300 }];
//   const result = [];
//   let currentContainerIndex = 0;
//   let currentLineWidth = containers[currentContainerIndex].width;
//   let currentLineHeight = 0;
//   let currentContainer = { ...containers[currentContainerIndex], elements: [] };

//   for (const element of sortedByHeightElements) {
//     if (currentLineWidth - element.width >= 0) {
//       currentContainer.elements.push(element);
//       currentLineWidth -= element.width;
//       currentLineHeight = Math.max(currentLineHeight, element.height);
//     } else {
//       // Element doesn't fit in the current container, create a new one
//       result.push(currentContainer);
//       currentContainerIndex++;
//       if (currentContainerIndex >= containers.length) {
//         // If no more containers available, create a new one
//         containers.push({ width: 500, height: 300 });
//       }
//       currentLineWidth = containers[currentContainerIndex].width;
//       currentLineHeight = 0;
//       currentContainer = {
//         ...containers[currentContainerIndex],
//         elements: [element],
//       };
//       currentLineWidth -= element.width;
//       currentLineHeight = Math.max(currentLineHeight, element.height);
//     }
//   }

//   result.push(currentContainer);

//   return result;
// };

// const layout = calculateLayout();
// console.log(layout);
