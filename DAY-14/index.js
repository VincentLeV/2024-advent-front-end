const main = document.querySelector('main')
const inputWrapper = document.querySelector('.input-wrapper')
const categoryWrapper = document.querySelector('.input-wrapper.category')
const optionsWrapper = document.querySelector('.input-wrapper.options')
const genderSelect = document.querySelector("select[id='gender']")
const categorySelect = document.querySelector("select[id='category']")
const optionsSelect = document.querySelector("select[id='options']")

const getFileContent = async (path) => {
  const response = await fetch(path)
  const data = await response.text()
  return data
}

const csvToArray = (text) => {
  const [header, ...lines] = text.replace(/\r/g, '').split('\n')
  const keys = ["Gender", "Category", "Option"]
  const mergeObjects = (oArr) => Object.assign({}, ...oArr)
  const extractObjPartial = (value, i) => ({ [keys[i]]: value })
  const lineToObject = (line) =>
    mergeObjects(line.split(',').map(extractObjPartial))
  const headerObject = mergeObjects(header.split(',').map(extractObjPartial))
  const dataObjects = lines.map(lineToObject)
  return [headerObject, ...dataObjects]
}

const groupData = (data) => {
  let currentGender = null
  let currentCategory = null

  return data.reduce((acc, obj) => {
    if (obj.Gender) {
      currentGender = obj.Gender.trim()
      currentCategory = null // Reset category when gender changes
    }

    if (!currentGender) {
      return acc // Skip if currentGender is empty
    }

    if (!acc[currentGender]) {
      acc[currentGender] = {}
    }

    if (obj.Category) {
      currentCategory = obj.Category.trim()
    }

    if (!currentCategory || currentCategory.includes('Categories')) {
      return acc // Skip if currentCategory is empty or contains 'Categories'
    }

    if (!acc[currentGender][currentCategory]) {
      acc[currentGender][currentCategory] = []
    }

    if (obj.Option) {
      const option = obj.Option.trim()
      if (option.length) {
        acc[currentGender][currentCategory].push(option)
      }
    }

    // Clean out empty values in the value array
    acc[currentGender][currentCategory] = acc[currentGender][currentCategory].filter(Boolean)

    return acc
  }, {})
}


const createSelectContainer = (extraClass) => {
  const wrapper = document.createElement('div')
  wrapper.classList.add("input-wrapper", extraClass)
  const container = document.createElement('div')
  container.classList.add('input-container')
  wrapper.appendChild(container)
  return { wrapper, container }
}

const createOptions = (selectEl, options) => {
  options.forEach(option => {
    const optionEl = document.createElement('option')
    optionEl.value = option
    optionEl.textContent = option
    selectEl.appendChild(optionEl)
  })
}

const reset = () => {
  categoryWrapper.style.display = 'none'
  optionsWrapper.style.display = 'none'
  categorySelect.innerHTML = ''
  optionsSelect.innerHTML = ''
}

let groupedData
  
document.addEventListener('DOMContentLoaded', async () => {
  const content = await getFileContent('./resources/options.csv') 
  const dataArray = csvToArray(content)
  groupedData = groupData(dataArray) // Do not skip the header
  categoryWrapper.style.display = 'none'
  optionsWrapper.style.display = 'none'
  const genderOptions = ["", ...Object.keys(groupedData)]
  createOptions(genderSelect, genderOptions)
})

genderSelect.addEventListener('change', (e) => {
  reset()
  if (e.target.value) {
    categoryWrapper.style.display = 'block'
    const options = ["", ...Object.keys(groupedData[e.target.value])]
    createOptions(categorySelect, options)
  } else {
    reset()
  }
})

categorySelect.addEventListener('change', (e) => {
  if (e.target.value) {
    optionsWrapper.style.display = 'block'
    const options = groupedData[genderSelect.value][e.target.value]
    createOptions(optionsSelect, options)
  } else {
    optionsWrapper.style.display = 'none'
  }
})