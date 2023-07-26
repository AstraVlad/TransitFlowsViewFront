import { useEffect, useState } from 'react'
import { Box } from '@mui/material'
import InfoBar from './components/infobar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ProjectSelector from './components/projectselector';
import { DataContext } from './contexts/DataContext';
import TFDasboard from './components/dashboard';



const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });


const projectData = {
  name: 'Пробный проект',
  city: 'Какой-то город',
  year: '20ХХ',
  variant: 'Незнамо какой'
}

function App() {
  const [theme, setTheme] = useState(lightTheme)
  const [selectedFile, setSelectedFile] = useState('')

  const themeSwitcher = () => {
    if (theme == darkTheme) {
      setTheme(lightTheme)
    } else {
      setTheme(darkTheme)
    }
  }

  const dataFileSelector = (file) => {
    setSelectedFile(file)
  }

  useEffect(() => {
    const data = window.localStorage.getItem('selectedFile_FILE');
    //console.log(data)
    if (data) setSelectedFile(JSON.parse(data));
  }, []);

  useEffect(() => {
    if (selectedFile) {
      window.localStorage.setItem('selectedFile_FILE', JSON.stringify(selectedFile))
    }
  }, [selectedFile])


  return (
    <DataContext.Provider value={selectedFile}>
      <ThemeProvider theme={theme}>
        <Box sx={{
          width: '98vw',
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          position: 'absolute',
          flexDirection: 'column',
          top: 10,
          left: 10,
          bgcolor: 'background.default'
        }}>

          <InfoBar selectedFile={selectedFile} themeSwitcher={themeSwitcher}></InfoBar>
          <br />
          {!selectedFile ? <ProjectSelector setSelected={dataFileSelector} /> : <TFDasboard projectId={selectedFile}></TFDasboard>}

        </Box>
      </ThemeProvider>
    </DataContext.Provider>

  )
}

export default App
