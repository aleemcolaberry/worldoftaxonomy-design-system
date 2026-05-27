import { Routes, Route } from 'react-router-dom';
import Introduction from './pages/Introduction/Introduction';
import FontFamily from './pages/FontFamily/FontFamily';
import TextStyles from './pages/TextStyles/TextStyles';
import ColorPalettes from './pages/ColorPalettes/ColorPalettes';
import NeutralColors from './pages/NeutralColors/NeutralColors';
import BrandColors from './pages/BrandColors/BrandColors';
import ButtonPage from './pages/Button/Button';
import ButtonGroupPage from './pages/ButtonGroup/ButtonGroup';
import ButtonCompactPage from './pages/ButtonCompact/ButtonCompact';
import InputPage from './pages/Input/Input';
import SelectPage from './pages/Select/Select';
import CheckboxPage from './pages/Checkbox/Checkbox';
import RadioPage from './pages/Radio/Radio';
import CardPage from './pages/Card/Card';
import ModalPage from './pages/Modal/Modal';
import ToastPage from './pages/Toast/Toast';
import TooltipPage from './pages/Tooltip/Tooltip';
import Showcase from './pages/Showcase/Showcase';
import Playground from './pages/Playground/Playground';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Introduction />} />
      <Route path="/typography/font-family" element={<FontFamily />} />
      <Route path="/typography/text-styles" element={<TextStyles />} />
      <Route path="/colors/palettes" element={<ColorPalettes />} />
      <Route path="/colors/neutral" element={<NeutralColors />} />
      <Route path="/colors/brand" element={<BrandColors />} />
      <Route path="/components/button" element={<ButtonPage />} />
      <Route path="/components/button-group" element={<ButtonGroupPage />} />
      <Route path="/components/button-compact" element={<ButtonCompactPage />} />
      <Route path="/components/input" element={<InputPage />} />
      <Route path="/components/select" element={<SelectPage />} />
      <Route path="/components/checkbox" element={<CheckboxPage />} />
      <Route path="/components/radio" element={<RadioPage />} />
      <Route path="/components/card" element={<CardPage />} />
      <Route path="/components/modal" element={<ModalPage />} />
      <Route path="/components/toast" element={<ToastPage />} />
      <Route path="/components/tooltip" element={<TooltipPage />} />
      <Route path="/showcase" element={<Showcase />} />
      <Route path="/playground" element={<Playground />} />
    </Routes>
  );
}
