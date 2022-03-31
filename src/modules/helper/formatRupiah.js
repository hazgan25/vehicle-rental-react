const formatRupiah = (number) => {
    let separator
    let number_string = number.toString(),
        split = number_string.split(','),
        remainder = split[0].length % 3,
        rupiah = split[0].substr(0, remainder),
        ribuan = split[0].substr(remainder).match(/\d{3}/gi)

    if (ribuan) {
        separator = remainder ? '.' : ''
        rupiah += separator + ribuan.join('.')
    }
    return rupiah
}

export default formatRupiah 