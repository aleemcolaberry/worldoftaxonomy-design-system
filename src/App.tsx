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
      <Route path="/showcase" element={<Showcase />} />
      <Route path="/playground" element={<Playground />} />
    </Routes>
  );
}
