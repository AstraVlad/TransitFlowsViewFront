import { Box, Button, colors } from "@mui/material";
import { useProjectsListLoader } from "../utils/getdata";
import RichObjectTreeView from "./ui/richtreeview";
import { useState } from "react";


const fileExtension = '.xlsx'

const isFile = (path) => {
    return path.endsWith(fileExtension)
}

export default function ProjectSelector({ setSelected }) {
    const { projects, isError, isLoading } = useProjectsListLoader()
    const [fileSelected, setFileSelected] = useState('')

    if (isLoading) {
        return (
            <Box borderColor='red'>
                <p>Загружаю данные</p>
            </Box>
        )
    } else if (isError) {
        return (
            <Box sx={{
                backgroundColor: 'red',
                color: 'white',
                textAlign: 'center',
            }}>
                <p>Ошибка загрузки данных!</p>
            </Box>
        )
    } else {
        return (
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignContent: 'center',
                    textAlign: 'center',
                    width: 450
                }}>
                <h2>Выберите проект для загрузки:</h2>
                <RichObjectTreeView
                    data={projects}
                    setFileSelected={setFileSelected}
                >

                </RichObjectTreeView>
                <Button
                    disabled={!isFile(fileSelected)}
                    variant="contained"
                    onClick={() => setSelected(fileSelected)}
                >
                    Загрузить выбранный проект
                </Button>
            </Box>
        )
    }
}