
export const getFile = async (req, res) => {
    const fileName = req.params.fileName;
    res.sendFile(`D:\\Studing\\University\\Ucode\\usof\\server\\uploads\\${fileName}`, (err) => console.log(err));
}