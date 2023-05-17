import { useState } from "react";

interface Container {
  width: number;
  height: number;
  details: Element[];
}

interface Element {
  id: number;
  width: number;
  height: number;
}

export const App3 = () => {
  const [elements, setElements] = useState<Element[]>([]);
  const [containers, setContainers] = useState<Container[]>([]);
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  const handleContainerSizeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    const [width, height] = value.split("x").map(Number);
    setContainerWidth(width);
    setContainerHeight(height);
  };

  const handleElementSizeChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const updatedElements = [...elements];
    const element = updatedElements[index];
    element[name] = Number(value);
    setElements(updatedElements);
  };

  const addElement = () => {
    const newElement: Element = {
      id: elements.length + 1,
      width: 0,
      height: containerHeight,
    };
    setElements([...elements, newElement]);
  };

  const calculateLayout = () => {
    let currentContainer: Container = {
      width: containerWidth,
      height: containerHeight,
      details: [],
    };
    const updatedContainers: Container[] = [currentContainer];

    for (const element of elements) {
      let placed = false;

      for (const container of updatedContainers) {
        if (container.width >= element.width) {
          container.details.push(element);
          container.width -= element.width;
          placed = true;
          break;
        }
      }

      if (!placed) {
        const remainingWidth = containerWidth - element.width;
        if (remainingWidth >= 0) {
          currentContainer = {
            width: remainingWidth,
            height: containerHeight,
            details: [element],
          };
          updatedContainers.push(currentContainer);
        }
      }
    }

    setContainers(updatedContainers);
  };

  return (
    <div style={{ position: "absolute", left: "40%", top: "20%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <h1>Linear Nesting Example</h1>
        <div>
          <label htmlFor="containerSize">
            Размер холста (ширина x высота):
          </label>
          <input
            type="text"
            id="containerSize"
            onChange={handleContainerSizeChange}
          />
        </div>
        <h2>Элементы:</h2>
        {elements.map((element, index) => (
          <div key={element.id}>
            <label htmlFor={`elementWidth${element.id}`}>
              Ширина элемента {element.id}:
            </label>
            <input
              type="number"
              id={`elementWidth${element.id}`}
              name="width"
              onChange={(e) => handleElementSizeChange(index, e)}
            />
          </div>
        ))}
        <div
          style={{
            width: 500,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <button onClick={addElement}>Добавить элемент</button>
          {elements.length > 0 && (
            <button onClick={calculateLayout}>Рассчитать</button>
          )}
        </div>
      </div>
      {containers.length > 0 && (
        <div className="canvas">
          {containers.map((container) => (
            <div
              key={container.width}
              className="container"
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",

                marginTop: 20,

                width: `${containerWidth}px`,
                height: `${containerHeight}px`,
                backgroundColor: "cyan",
              }}
            >
              {container.details.map((element) => (
                <div
                  key={element.id}
                  className="element"
                  style={{
                    width: `${element.width - 2}px`,
                    height: `${element.height - 2}px`,
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 8,
                    border: "1px solid blue",
                    color: "black",
                    backgroundColor: "lightblue",
                  }}
                >
                  <p style={{ fontSize: 8, color: "black" }}>{element.id}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
