const formatFollowers = (number) => {
    let n = number
    let i = 1
    while (Math.floor(n / 10) > 0) {
      n = Math.floor(n / 10);
      i++
    }
    if (i >= 1 && i < 4) {
      return number
    }
    else if (i >= 4 && i < 7) {
      return `${(number / 10 ** 3).toFixed(2)}K`
    }
  
    else if (i >= 7 && i <= 9) {
      return `${(number / 10 ** 6).toFixed(2)}M`
    }
  
    else {
      return `${(number / 10 ** 9).toFixed(2)}B`
    }
  
  }

  export default formatFollowers
