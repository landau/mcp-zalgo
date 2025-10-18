// Zalgo text generator
// Combining diacritical marks for zalgo effect

const ZALGO_UP = [
  '\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357',
  '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c',
  '\u0303', '\u0302', '\u030c', '\u0350', '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313',
  '\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369',
  '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u033e', '\u035b', '\u0346', '\u031a'
];

const ZALGO_MIDDLE = [
  '\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327', '\u0328', '\u0334',
  '\u0335', '\u0336', '\u034f', '\u035c', '\u035d', '\u035e', '\u035f', '\u0360', '\u0362', '\u0338',
  '\u0337', '\u0361', '\u0489'
];

const ZALGO_DOWN = [
  '\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324',
  '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f', '\u0330',
  '\u0331', '\u0332', '\u0333', '\u0339', '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348',
  '\u0349', '\u034d', '\u034e', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323'
];

/**
 * Convert text to zalgo format by adding combining diacritical marks
 * @param {string} text - The text to convert
 * @param {Object} options - Configuration options
 * @param {string} options.intensity - 'light', 'medium', or 'heavy'
 * @param {boolean} options.up - Add marks above characters
 * @param {boolean} options.middle - Add marks through characters
 * @param {boolean} options.down - Add marks below characters
 * @returns {string} The zalgoified text
 */
export function zalgoify(text, options = {}) {
  const {
    intensity = 'medium',
    up = true,
    middle = true,
    down = true
  } = options;

  // Determine how many marks to add based on intensity
  let maxMarks;
  switch (intensity) {
    case 'light':
      maxMarks = 2;
      break;
    case 'heavy':
      maxMarks = 8;
      break;
    case 'medium':
    default:
      maxMarks = 4;
      break;
  }

  let result = '';
  
  for (let char of text) {
    result += char;
    
    // Don't add marks to spaces
    if (char === ' ' || char === '\n' || char === '\t') {
      continue;
    }

    const numMarks = Math.floor(Math.random() * maxMarks) + 1;
    
    for (let i = 0; i < numMarks; i++) {
      const markType = Math.random();
      
      if (up && markType < 0.33) {
        result += ZALGO_UP[Math.floor(Math.random() * ZALGO_UP.length)];
      } else if (middle && markType >= 0.33 && markType < 0.66) {
        result += ZALGO_MIDDLE[Math.floor(Math.random() * ZALGO_MIDDLE.length)];
      } else if (down && markType >= 0.66) {
        result += ZALGO_DOWN[Math.floor(Math.random() * ZALGO_DOWN.length)];
      }
    }
  }
  
  return result;
}

