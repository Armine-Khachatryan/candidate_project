
export const onChangeBody = (e, body, setBody,isValid) => {
    const bodyCopy = JSON.parse(JSON.stringify(body));
    if (e.target.value === '') {
        delete bodyCopy[e.target.name];
        setBody(bodyCopy);
        return;
    }
    if (isValid !== undefined) {
        if (isValid) {
            bodyCopy[e.target.name] = e.target.value;
        } else {
            delete bodyCopy[e.target.name];
        }
    } else {
        bodyCopy[e.target.name] = e.target.value;
    }
    setBody(bodyCopy);
};

export const validateFields = (query = [], data = []) => {
    return !query?.every((r) => data.includes(r));
};

export const userData = JSON.parse(localStorage.getItem('user'))
