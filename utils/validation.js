let emptyFillValidation = (res, ...fields) => {
     if (fields.includes("") || fields.includes(undefined)) {
        return res.send({ message: "Please, Fill all the field." })
    }
}

module.exports = {emptyFillValidation}