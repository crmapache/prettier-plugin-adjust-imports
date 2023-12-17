import { extractImportPath } from './extract-import-path'


describe('extractImportPath', () => {
  test('should extract path correctly from simple import rounded with \'', () => {
    expect.assertions(1)

    const result = extractImportPath('import \'./styles.scss\'')

    expect(result).toEqual('./styles.scss')
  })

  test('should extract path correctly from simple import rounded with "', () => {
    expect.assertions(1)

    const result = extractImportPath('import "./styles.scss"')

    expect(result).toEqual('./styles.scss')
  })

  test('should extract path correctly from simple import with trailing ;', () => {
    expect.assertions(1)

    const result = extractImportPath('import "./styles.scss";')

    expect(result).toEqual('./styles.scss')
  })

  test('should extract path correctly from import with alias', () => {
    expect.assertions(1)

    const result = extractImportPath('import emptySearchResultSadFace from \'@assets/svg/empty-search-result-sad-face.svg\'')

    expect(result).toEqual('@assets/svg/empty-search-result-sad-face.svg')
  })

  test('should extract path correctly from relative import', () => {
    expect.assertions(1)

    const result = extractImportPath('import { BlackTransparentMask } from \'../../SharedPageMask\'')

    expect(result).toEqual('../../SharedPageMask')
  })

  test('should extract path correctly from multiline import', () => {
    expect.assertions(1)

    const result = extractImportPath('import {\n' +
      '  SearchInput,\n' +
      '  Tabs,\n' +
      '  Accordeon,\n' +
      '  Typography,\n' +
      '  Box,\n' +
      '  SecondaryButton,\n' +
      '  AccordeonElement,\n' +
      '} from \'@core\'')

    expect(result).toEqual('@core')
  })
})
