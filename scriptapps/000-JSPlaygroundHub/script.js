const applications = [
  ["StringToQR", "Convert text into a downloadable QR code in your browser.", "Images & design", "001-StringToQR"],
  ["QRCodeReader", "Decode QR codes from local images without uploading them.", "Images & design", "002-QRCodeReader"],
  ["ImageResizer", "Resize images by dimensions or percentage and download the result.", "Images & design", "003-ImageResizer"],
  ["ImageCropper", "Crop images with movable frames and aspect-ratio presets.", "Images & design", "004-ImageCropper"],
  ["ImageCompressor", "Adjust JPEG or WebP quality and compare file sizes locally.", "Images & design", "005-ImageCompressor"],
  ["ImageFormatConverter", "Convert images between PNG, JPEG, and WebP formats.", "Images & design", "006-ImageFormatConverter"],
  ["PixelArtEditor", "Create and export small pixel-art illustrations in the browser.", "Images & design", "007-PixelArtEditor"],
  ["ASCIIArtGenerator", "Turn images into text-based ASCII art with adjustable output.", "Images & design", "008-ASCIIArtGenerator"],
  ["ColorPaletteExtractor", "Extract a color palette from an image without uploading it.", "Images & design", "009-ColorPaletteExtractor"],
  ["GradientStudio", "Design CSS gradients and copy the generated styles.", "Images & design", "010-GradientStudio"],
  ["SVGPatternGenerator", "Generate repeating SVG patterns for backgrounds and artwork.", "Images & design", "011-SVGPatternGenerator"],
  ["CSSBlobGenerator", "Create organic CSS blob shapes and export their styles.", "Images & design", "012-CSSBlobGenerator"],
  ["FaviconGenerator", "Create favicon files from text, emoji, or an image.", "Images & design", "013-FaviconGenerator"],
  ["PhotoMosaicGenerator", "Build a colorful mosaic from an image in your browser.", "Images & design", "014-PhotoMosaicGenerator"],
  ["DuotoneImageMaker", "Apply a two-color duotone treatment to an image.", "Images & design", "015-DuotoneImageMaker"],
  ["PosterMaker", "Compose a simple poster with text, color, and image controls.", "Images & design", "016-PosterMaker"],
  ["SpriteSheetCutter", "Split a sprite sheet into individual downloadable tiles.", "Images & design", "017-SpriteSheetCutter"],
  ["ImageColorReplacer", "Replace selected colors in an image with local canvas processing.", "Images & design", "018-ImageColorReplacer"],
  ["CSSShadowDesigner", "Design layered CSS box shadows and copy the result.", "Images & design", "019-CSSShadowDesigner"],
  ["GlassmorphismDesigner", "Experiment with translucent glassmorphism panel styles.", "Images & design", "020-GlassmorphismDesigner"],
  ["UnitConverter", "Convert common length, weight, temperature, and data units.", "Utilities", "021-UnitConverter"],
  ["UnixTimestampExplorer", "Convert Unix timestamps to readable dates and back.", "Utilities", "022-UnixTimestampExplorer"],
  ["TimezoneMeetingFinder", "Compare local times to find a workable meeting window.", "Utilities", "023-TimezoneMeetingFinder"],
  ["PasswordGenerator", "Generate strong random passwords with configurable options.", "Utilities", "024-PasswordGenerator"],
  ["PassphraseGenerator", "Create memorable random passphrases from word lists.", "Utilities", "025-PassphraseGenerator"],
  ["TextDiffViewer", "Compare two text snippets and inspect their differences.", "Text & data", "026-TextDiffViewer"],
  ["TextTransformer", "Apply common case, whitespace, and text transformations.", "Text & data", "027-TextTransformer"],
  ["RegexPlayground", "Test regular expressions against sample text with live matches.", "Text & data", "028-RegexPlayground"],
  ["MarkdownPreviewer", "Write Markdown and preview the rendered result instantly.", "Text & data", "029-MarkdownPreviewer"],
  ["JSONFormatterAndExplorer", "Validate, format, minify, and explore JSON structures.", "Text & data", "030-JSONFormatterAndExplorer"],
  ["CSVExplorer", "Load CSV data, sort and filter rows, and inspect statistics.", "Text & data", "031-CSVExplorer"],
  ["CronExpressionVisualizer", "Visualize cron schedules and upcoming local occurrences.", "Developer tools", "032-CronExpressionVisualizer"],
  ["FileHashCalculator", "Calculate SHA-256 or SHA-512 file hashes locally.", "Developer tools", "033-FileHashCalculator"],
  ["Base64Workbench", "Encode and decode text or files using Base64 in your browser.", "Developer tools", "034-Base64Workbench"],
  ["URLInspector", "Break a URL into its protocol, host, path, query, and fragment.", "Developer tools", "035-URLInspector"],
  ["UnicodeInspector", "Inspect Unicode characters, code points, and their browser representations.", "Text & data", "036-UnicodeInspector"],
  ["ScreenRuler", "Measure distances and inspect coordinates directly on your screen.", "Utilities", "037-ScreenRuler"],
  ["AspectRatioCalculator", "Calculate matching dimensions for common aspect ratios.", "Utilities", "038-AspectRatioCalculator"],
  ["PomodoroTimer", "Work in focused intervals with a simple browser timer.", "Planning & focus", "039-PomodoroTimer"],
  ["KanbanBoard", "Organize tasks across a lightweight local kanban board.", "Planning & focus", "040-KanbanBoard"],
  ["DailyHabitGrid", "Track recurring habits on a compact visual calendar.", "Planning & focus", "041-DailyHabitGrid"],
  ["DecisionWheel", "Make a quick random choice with a customizable decision wheel.", "Planning & focus", "042-DecisionWheel"],
  ["PriorityMatrix", "Sort tasks by urgency and importance on a four-quadrant matrix.", "Planning & focus", "043-PriorityMatrix"],
  ["TimeboxingPlanner", "Plan a day by assigning work to clear time boxes.", "Planning & focus", "044-TimeboxingPlanner"],
  ["CountdownDashboard", "Keep multiple event countdowns visible in one dashboard.", "Utilities", "045-CountdownDashboard"],
  ["RandomPicker", "Choose a random item from a list with one click.", "Utilities", "046-RandomPicker"],
  ["FocusAmbientMixer", "Mix gentle ambient sounds for a calmer focus session.", "Audio & simulation", "047-FocusAmbientMixer"],
  ["ClipboardScratchpad", "Keep temporary notes and snippets close at hand in the browser.", "Text & data", "048-ClipboardScratchpad"],
  ["ReadingTimeAnalyzer", "Estimate reading time and inspect basic text statistics.", "Text & data", "049-ReadingTimeAnalyzer"],
  ["ExpenseSplitter", "Split shared expenses and calculate each person’s share.", "Utilities", "050-ExpenseSplitter"],
  ["Snake", "Play the classic grid-based Snake game.", "Games", "051-Snake"],
  ["2048", "Combine numbered tiles to reach the 2048 tile.", "Games", "052-2048"],
  ["Minesweeper", "Clear a minefield using logic and careful reveals.", "Games", "053-Minesweeper"],
  ["Breakout", "Bounce a paddle and break every brick on the screen.", "Games", "054-Breakout"],
  ["Asteroids", "Pilot a ship through an arcade field of drifting asteroids.", "Games", "055-Asteroids"],
  ["Tetris", "Arrange falling blocks and clear complete lines.", "Games", "056-Tetris"],
  ["MemoryCards", "Match hidden pairs in a compact memory challenge.", "Games", "057-MemoryCards"],
  ["ReactionTimeTester", "Measure how quickly you respond to a visual cue.", "Games", "058-ReactionTimeTester"],
  ["TypingSpeedGame", "Test typing speed and accuracy against changing prompts.", "Games", "059-TypingSpeedGame"],
  ["AimTrainer", "Practice fast and accurate pointer targeting.", "Games", "060-AimTrainer"],
  ["LightsOut", "Turn off every light by solving the tile puzzle.", "Games", "061-LightsOut"],
  ["MazeGeneratorSolver", "Generate mazes and watch paths get solved.", "Games", "062-MazeGeneratorSolver"],
  ["ConwaysGameOfLife", "Explore emergent patterns in Conway’s cellular automaton.", "Games", "063-ConwaysGameOfLife"],
  ["InfiniteMinesweeper", "Explore an expanding minesweeper field without fixed edges.", "Games", "064-InfiniteMinesweeper"],
  ["OneLinePuzzle", "Solve compact puzzles by drawing one continuous line.", "Games", "065-OneLinePuzzle"],
  ["ProceduralDungeonExplorer", "Explore a dungeon assembled differently each run.", "Games", "066-ProceduralDungeonExplorer"],
  ["JWTInspector", "Decode and inspect JSON Web Token headers and payloads locally.", "Developer tools", "067-JWTInspector"],
  ["HTTPStatusExplorer", "Browse HTTP status codes and their common meanings.", "Developer tools", "068-HTTPStatusExplorer"],
  ["CSSEasingPlayground", "Tune CSS easing curves and preview their motion.", "Developer tools", "069-CSSEasingPlayground"],
  ["FlexboxPlayground", "Learn and experiment with CSS Flexbox alignment rules.", "Developer tools", "070-FlexboxPlayground"],
  ["GridPlayground", "Explore CSS Grid tracks, gaps, and placement interactively.", "Developer tools", "071-GridPlayground"],
  ["SQLFormatter", "Format SQL queries for easier reading and sharing.", "Developer tools", "072-SQLFormatter"],
  ["GitCommandBuilder", "Assemble common Git commands from guided options.", "Developer tools", "073-GitCommandBuilder"],
  ["GitHubREADMEBadgeBuilder", "Build copy-ready README badges for GitHub projects.", "Developer tools", "074-GitHubREADMEBadgeBuilder"],
  ["UUIDGeneratorLab", "Generate and inspect UUID values in the browser.", "Developer tools", "075-UUIDGeneratorLab"],
  ["HTMLEntityExplorer", "Search HTML entities and copy their character references.", "Developer tools", "076-HTMLEntityExplorer"],
  ["ColorContrastChecker", "Check foreground and background colors against contrast guidance.", "Developer tools", "077-ColorContrastChecker"],
  ["ViewportTester", "Preview a page at common viewport dimensions.", "Developer tools", "078-ViewportTester"],
  ["GenerativeArtPlayground", "Create colorful procedural artwork from adjustable parameters.", "Creative & visual", "079-GenerativeArtPlayground"],
  ["FractalExplorer", "Explore recursive fractal forms with interactive controls.", "Creative & visual", "080-FractalExplorer"],
  ["ConstellationMaker", "Connect points into custom constellation illustrations.", "Creative & visual", "081-ConstellationMaker"],
  ["ProceduralIslandGenerator", "Generate stylized islands from procedural terrain rules.", "Creative & visual", "082-ProceduralIslandGenerator"],
  ["MusicSequencer", "Compose repeating rhythms with a browser-based step sequencer.", "Audio & simulation", "083-MusicSequencer"],
  ["VirtualTheremin", "Play expressive pitch and volume with pointer movement.", "Audio & simulation", "084-VirtualTheremin"],
  ["AudioVisualizer", "See live frequency and waveform activity as animated graphics.", "Audio & simulation", "085-AudioVisualizer"],
  ["ParticlePlayground", "Experiment with interactive particle forces and motion.", "Audio & simulation", "086-ParticlePlayground"],
  ["BoidsSimulator", "Watch simple steering rules create flocking behavior.", "Audio & simulation", "087-BoidsSimulator"],
  ["GravitySandbox", "Experiment with bodies, orbits, and gravity in a canvas sandbox.", "Audio & simulation", "088-GravitySandbox"],
  ["DoublePendulumSimulator", "Explore the unpredictable motion of a double pendulum.", "Audio & simulation", "089-DoublePendulumSimulator"],
  ["FourierDrawingVisualizer", "Decompose a drawing into rotating Fourier components.", "Audio & simulation", "090-FourierDrawingVisualizer"],
  ["SortingAlgorithmRace", "Compare sorting algorithms as they race across a data set.", "Audio & simulation", "091-SortingAlgorithmRace"],
  ["PathfindingVisualizer", "Visualize pathfinding algorithms navigating a grid.", "Audio & simulation", "092-PathfindingVisualizer"],
  ["CellularAutomataLab", "Experiment with evolving cells and neighborhood rules.", "Audio & simulation", "093-CellularAutomataLab"],
  ["LSystemPlantGenerator", "Grow branching plant forms from L-system rules.", "Creative & visual", "094-LSystemPlantGenerator"],
  ["VoronoiPlayground", "Explore Voronoi cells and their geometric boundaries.", "Creative & visual", "095-VoronoiPlayground"],
  ["PerlinNoiseTerrainMap", "Generate organic terrain maps from layered noise.", "Creative & visual", "096-PerlinNoiseTerrainMap"],
  ["PhysicsMarbleBox", "Drop marbles into a playful 2D physics box.", "Audio & simulation", "097-PhysicsMarbleBox"],
  ["PixelPhysicsSandbox", "Paint pixels and watch simple material physics unfold.", "Audio & simulation", "098-PixelPhysicsSandbox"],
  ["SoundToShapeVisualizer", "Deform geometric shapes with local microphone frequencies.", "Audio & simulation", "099-SoundToShapeVisualizer"],
  ["TinyEcosystemSimulator", "Observe plants, herbivores, and predators evolve by simple rules.", "Audio & simulation", "100-TinyEcosystemSimulator"],
].map(([name, description, category, project]) => ({
  name,
  description,
  category,
  url: `../${project}/index.html`,
}));

const appGrid = document.querySelector("#app-grid");
const featuredGrid = document.querySelector("#featured-grid");
const appCount = document.querySelector("#app-count");
const appSearch = document.querySelector("#app-search");
const categoryFilters = document.querySelector("#category-filters");
const emptyState = document.querySelector("#empty-state");
let selectedCategory = "All";
const featuredNames = ["GenerativeArtPlayground", "MusicSequencer", "PathfindingVisualizer", "TinyEcosystemSimulator", "JSONFormatterAndExplorer"];

const categories = ["All", ...new Set(applications.map((application) => application.category))];

for (const category of categories) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "category-button";
  button.dataset.category = category;
  button.textContent = category;
  button.setAttribute("aria-pressed", category === selectedCategory);
  button.addEventListener("click", () => {
    selectedCategory = category;
    renderApplications();
  });
  categoryFilters.append(button);
}

function createCard(application) {
  const card = document.createElement("article");
  card.className = "app-card";

  const category = document.createElement("p");
  category.className = "card-category";
  category.textContent = application.category;

  const title = document.createElement("h3");
  title.textContent = application.name;

  const description = document.createElement("p");
  description.textContent = application.description;

  card.append(category, title, description);

  const link = document.createElement("a");
  link.href = application.url;
  link.textContent = "Open application →";
  card.append(link);
  return card;
}

featuredGrid.replaceChildren(...featuredNames
  .map((name) => applications.find((application) => application.name === name))
  .filter(Boolean)
  .map(createCard));

function renderApplications() {
  const query = appSearch.value.trim().toLowerCase();
  const visibleApplications = applications.filter((application) => {
    const matchesCategory = selectedCategory === "All" || application.category === selectedCategory;
    const matchesQuery = `${application.name} ${application.description}`.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  appGrid.replaceChildren();
  appCount.textContent = `${visibleApplications.length} of ${applications.length} applications`;
  emptyState.hidden = visibleApplications.length > 0;
  for (const button of categoryFilters.children) {
    button.setAttribute("aria-pressed", button.dataset.category === selectedCategory);
  }

  for (const application of visibleApplications) appGrid.append(createCard(application));
}

appSearch.addEventListener("input", renderApplications);
renderApplications();
