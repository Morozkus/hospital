class Fetch {
    async getPacients() {
        let prom = await fetch(`http://localhost:5000/list/pacient`)

        let result = await prom.json()

        const arr = await result
        return arr
    }

    async getPacientById(id) {
        let prom = await fetch(`http://localhost:5000/list/pacient/${id}`)

        let result = await prom.json()

        const arr = await result.map(el => {
            return `${src}/${el}`
        });
        return arr
    }

    async updateList(id, fio, phone, href) {
        let prom = await fetch(`http://localhost:5000/list/${href}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id, fio, phone})
        })

        let result = await prom.json()
    }

    async daleteList(id, href) {
        let prom = await fetch(`http://localhost:5000/list/${href}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({id})
        })

        let result = await prom.json()
    }

    async deletePrice(name) {
        let prom = await fetch(`http://localhost:5000/list/price`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({name})
        })

        let result = await prom.json()
        if (result.succes) {
            return alert('Удалено')
        } else {
            return alert('Такой услуги нет в каталоге')
        }
    }
}

export default new Fetch