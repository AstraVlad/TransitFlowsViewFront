import useSWR from 'swr'
import axios from 'axios'

const projectsUrl = 'http://5.61.61.4:9020/projects'

const projFetcher = async (id) => {
    //console.log(id)
    let json
    if (id == '0') {
        json = await axios.get(projectsUrl)
    } else {
        json = await axios.get(`${projectsUrl}/?filename=${id}`)
        //console.log(json)
    }
    //console.log(json.data)
    const data = JSON.parse(json.data.replace(/\bNaN\b/g, "null"))
    //console.log(data)
    return data
};



export function useProjectsListLoader() {
    const { data, error, isLoading } = useSWR('0', projFetcher)
    return {
        projects: data,
        isError: error,
        isLoading
    }
}

export function useProjectLoader(id) {
    const { data, error, isLoading } = useSWR(id, projFetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
        revalidateOnMount: true
    })
    return {
        data,
        isError: error,
        isLoading
    }
}