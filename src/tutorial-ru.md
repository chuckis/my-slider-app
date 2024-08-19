## React TypeScript Tutorial: Создание компонента с ползунками и зависимыми значениями

В этом руководстве мы шаг за шагом создадим компонент на React с использованием TypeScript, который включает ползунки для изменения длины, ширины, толщины и объема. Вы сможете фиксировать значения ползунков и автоматически пересчитывать другие параметры в зависимости от объема.

### Шаг 1: Создание нового проекта

Для начала создадим новый проект с использованием `Create React App` и шаблона для TypeScript.

Откройте терминал и выполните следующую команду:

```bash
npx create-react-app volume-slider-app --template typescript
```

После завершения установки перейдите в папку проекта:

```bash
cd volume-slider-app
```

Запустите проект командой:

```bash
npm start
```

Проект откроется в браузере по адресу `http://localhost:3000`.

### Шаг 2: Основы компонента с ползунками

Создадим базовый компонент, который будет содержать ползунки для длины, ширины и толщины.

1. Создайте новый файл `src/SliderComponent.tsx`.
2. Добавьте следующий код:

```tsx
import React, { useState } from 'react';

const SliderComponent: React.FC = () => {
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(10);

  return (
    <div>
      <div>
        <label>Длина: {length}</label>
        <input
          type="range"
          min="1"
          max="100"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Ширина: {width}</label>
        <input
          type="range"
          min="1"
          max="100"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Толщина: {height}</label>
        <input
          type="range"
          min="1"
          max="100"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default SliderComponent;
```

3. Откройте файл `src/App.tsx` и замените его содержимое на:

```tsx
import React from 'react';
import SliderComponent from './SliderComponent';

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Volume Calculator</h1>
      <SliderComponent />
    </div>
  );
}

export default App;
```

Теперь, когда вы обновите браузер, увидите три ползунка, которые позволяют изменять длину, ширину и толщину.

### Шаг 3: Добавление вычисления объема

Добавим вычисление объема на основе значений длины, ширины и толщины.

1. Измените код в `SliderComponent.tsx`:

```tsx
const calculateVolume = (length: number, width: number, height: number): number => {
  return length * width * height;
};

const SliderComponent: React.FC = () => {
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(10);
  const [volume, setVolume] = useState<number>(calculateVolume(length, width, height));

  // Пересчет объема при изменении параметров
  const updateVolume = () => {
    setVolume(calculateVolume(length, width, height));
  };

  return (
    <div>
      <div>
        <label>Длина: {length}</label>
        <input
          type="range"
          min="1"
          max="100"
          value={length}
          onChange={(e) => {
            setLength(Number(e.target.value));
            updateVolume();
          }}
        />
      </div>
      <div>
        <label>Ширина: {width}</label>
        <input
          type="range"
          min="1"
          max="100"
          value={width}
          onChange={(e) => {
            setWidth(Number(e.target.value));
            updateVolume();
          }}
        />
      </div>
      <div>
        <label>Толщина: {height}</label>
        <input
          type="range"
          min="1"
          max="100"
          value={height}
          onChange={(e) => {
            setHeight(Number(e.target.value));
            updateVolume();
          }}
        />
      </div>
      <div>
        <label>Объем: {volume}</label>
      </div>
    </div>
  );
};
```

Теперь объем будет пересчитываться при изменении любого из параметров (длины, ширины, толщины).

### Шаг 4: Фиксация значений с помощью переключателей

Добавим возможность фиксировать значения длины, ширины, толщины и объема с помощью переключателей.

1. Добавим переключатели к ползункам в `SliderComponent.tsx`:

```tsx
const SliderComponent: React.FC = () => {
  const [length, setLength] = useState<number>(10);
  const [width, setWidth] = useState<number>(10);
  const [height, setHeight] = useState<number>(10);
  const [volume, setVolume] = useState<number>(calculateVolume(length, width, height));

  const [isLengthFixed, setIsLengthFixed] = useState<boolean>(false);
  const [isWidthFixed, setIsWidthFixed] = useState<boolean>(false);
  const [isHeightFixed, setIsHeightFixed] = useState<boolean>(false);
  const [isVolumeFixed, setIsVolumeFixed] = useState<boolean>(false);

  const updateVolume = () => {
    if (!isVolumeFixed) {
      setVolume(calculateVolume(length, width, height));
    }
  };

  return (
    <div>
      <div>
        <label>Длина: {length}</label>
        <input
          type="range"
          min="1"
          max="100"
          value={length}
          onChange={(e) => {
            if (!isLengthFixed) {
              setLength(Number(e.target.value));
              updateVolume();
            }
          }}
          disabled={isLengthFixed}
        />
        <label>
          <input
            type="checkbox"
            checked={isLengthFixed}
            onChange={() => setIsLengthFixed(!isLengthFixed)}
          /> Фиксировать
        </label>
      </div>

      <div>
        <label>Ширина: {width}</label>
        <input
          type="range"
          min="1"
          max="100"
          value={width}
          onChange={(e) => {
            if (!isWidthFixed) {
              setWidth(Number(e.target.value));
              updateVolume();
            }
          }}
          disabled={isWidthFixed}
        />
        <label>
          <input
            type="checkbox"
            checked={isWidthFixed}
            onChange={() => setIsWidthFixed(!isWidthFixed)}
          /> Фиксировать
        </label>
      </div>

      <div>
        <label>Толщина: {height}</label>
        <input
          type="range"
          min="1"
          max="100"
          value={height}
          onChange={(e) => {
            if (!isHeightFixed) {
              setHeight(Number(e.target.value));
              updateVolume();
            }
          }}
          disabled={isHeightFixed}
        />
        <label>
          <input
            type="checkbox"
            checked={isHeightFixed}
            onChange={() => setIsHeightFixed(!isHeightFixed)}
          /> Фиксировать
        </label>
      </div>

      <div>
        <label>Объем: {volume}</label>
        <input
          type="range"
          min="1"
          max="100000"
          value={volume}
          onChange={(e) => {
            if (!isVolumeFixed) {
              setVolume(Number(e.target.value));
            }
          }}
          disabled={isVolumeFixed}
        />
        <label>
          <input
            type="checkbox"
            checked={isVolumeFixed}
            onChange={() => setIsVolumeFixed(!isVolumeFixed)}
          /> Фиксировать
        </label>
      </div>
    </div>
  );
};
```

### Шаг 5: Взаимозависимость значений

Теперь реализуем логику, при которой при изменении фиксированного объема пересчитываются длина, ширина или толщина.

1. Обновите `SliderComponent.tsx`, добавив зависимость между параметрами:

```tsx
const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  const newVolume = Number(event.target.value);
  if (!isVolumeFixed) {
    setVolume(newVolume);

    if (isLengthFixed) {
      setHeight(newVolume / (length * width));
    } else if (isWidthFixed) {
      setHeight(newVolume / (length * width));
    } else if (isHeightFixed) {
      setWidth(newVolume / (

length * height));
    } else {
      setHeight(newVolume / (length * width));
    }
  }
};
```

### Заключение

Вы создали компонент с ползунками и взаимозависимыми значениями, где каждое значение можно зафиксировать. Теперь ваш компонент автоматически пересчитывает параметры в зависимости от зафиксированных значений и изменения объема. Вы можете расширить этот компонент, добавив стилизацию, дополнительную логику или другие функции по необходимости.