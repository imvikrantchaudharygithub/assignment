class StringCalculator {
    add(numbers) {
      if (!numbers) return 0;
  
      let delimiter = /,|\n/; 
      let customDelimiterMatch = numbers.match(/^\/\/(.+)\n/);
      if (customDelimiterMatch) {
        delimiter = new RegExp(customDelimiterMatch[1].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')); 
        numbers = numbers.slice(customDelimiterMatch[0].length); 
      }
  
      let numberArray = numbers.split(delimiter).map(n => parseInt(n, 10));
      let negatives = numberArray.filter(n => n < 0);
      
      if (negatives.length) {
        throw new Error(`Negative numbers not allowed: ${negatives.join(', ')}`);
      }
  
      return numberArray.reduce((sum, num) => sum + (isNaN(num) ? 0 : num), 0);
    }
  }
  
 
  const calculator = new StringCalculator();
  
  console.log(calculator.add(""));          // Output: 0
  console.log(calculator.add("1"));         // Output: 1
  console.log(calculator.add("1,5"));       // Output: 6
  console.log(calculator.add("1\n2,3"));    // Output: 6
  console.log(calculator.add("//;\n1;2"));  // Output: 3
  console.log(calculator.add("//-\n3-5"));  // Output: 8
  
  try {
    console.log(calculator.add("1,-2,3,-4"));
  } catch (e) {
    console.error(e.message); 
  } 