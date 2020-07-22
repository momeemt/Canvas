const canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      FONT_HEIGHT = 15,
      MARGIN = 35,
      HAND_TRUNCATION = canvas.width / 25,
      HOUR_HAND_TRUNCATION = canvas.width / 10,
      NUMERAL_SPACING = 20,
      RADIUS = canvas.width / 2 - MARGIN,
      HAND_RADIUS = RADIUS + NUMERAL_SPACING

const drawCircle = () => {
  context.beginPath()
  context.arc(canvas.width / 2, canvas.height / 2, RADIUS, 0, Math.PI * 2, true)
  context.stroke()
}

const drawNumerals = () => {
  const numerals = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  let angle = 0
  let numeralWidth = 0
  numerals.forEach(function(numeral) {
    angle = Math.PI / 6 * (numeral - 3)
    numeralWidth = context.measureText(numeral.toString()).width
    context.fillText(numeral.toString(),
      canvas.width / 2 + Math.cos(angle) * (HAND_RADIUS) - numeralWidth / 2,
      canvas.height / 2 + Math.sin(angle) * (HAND_RADIUS) + FONT_HEIGHT / 3
    )
  })
}

const drawCenter = () => {
  context.beginPath()
  context.arc(canvas.width / 2, canvas.height / 2, 5, 0, Math.PI * 2, true)
  context.fill()
}

const drawHand = (loc, isHour) => {
  const angle = Math.PI * 2 * (loc / 60) - Math.PI / 2
  const handRadius = isHour ? RADIUS - HAND_TRUNCATION - HOUR_HAND_TRUNCATION
                            : RADIUS - HAND_TRUNCATION
  context.moveTo(canvas.width / 2, canvas.height / 2)
  context.lineTo(canvas.width / 2 + Math.cos(angle) * handRadius,
                 canvas.height / 2+ Math.sin(angle) * handRadius)
  context.stroke()
}

const drawHands = () => {
  const date = new Date
  const hour = date.getHours()
  const processedHour = hour > 12 ? hour - 12 : hour
  drawHand(processedHour * 5 + (date.getMinutes() / 60) * 5, true)
  drawHand(date.getMinutes(), false)
  drawHand(date.getSeconds(), false)
}

const drawClock = () => {
  context.clearRect(0, 0, canvas.width, canvas.height)
  drawCircle()
  drawCenter()
  drawHands()
  drawNumerals()
}

context.font = FONT_HEIGHT + 'px Arial'
loop = setInterval(drawClock, 1000)
