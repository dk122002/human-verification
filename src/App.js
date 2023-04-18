import React, { useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
function App() {
return (
<BrowserRouter>
<nav>
<ul>
<li>
<Link to="/">Home</Link>
</li>
</ul>
</nav>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/protectedPage" element={<ProtectedPage />} />
</Routes>
</BrowserRouter>
);
}
const Home = () => (
<div>
<h1>Home Page</h1>
<button>
<Link to="/protectedPage">Go to Protected Page</Link>
</button>
</div>
);
const ProtectedPage = () => {
const [unlocked, setUnlocked] = useState(false);
const handleUnlock = () => setUnlocked(true);
return (
<div>
{!unlocked && <Captcha setUnlocked={handleUnlock} />}
{unlocked && <div>Secret message</div>}
</div>
);
};
const Captcha = ({ setUnlocked }) => {
const [digit, setDigit] = useState(null);
const digits = [1, 2, 3, 4, 5, 6];
const handleClick = (selectedDigit) => {
if (selectedDigit === digit) {
setUnlocked(true);
} else {
setDigit(null);
}
};
return (
<div>
<h2>Verify you are human</h2>
<p>Select the digit:</p>
{digits.map((d) => (
<img
key={d}
src={'https://dummyimage.com/50x50/000/fff&text=${d}'}
alt={`${d}`}
onClick={() => setDigit(d)}
style={{ cursor: "pointer", marginRight: "10px" }}
/>
))}
{digit && (
<button onClick={() => handleClick(digit)}>Verify</button>
)}
</div>
);
};
export default App;
