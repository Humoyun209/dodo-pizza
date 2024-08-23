import { hashSync } from 'bcrypt'
import { prisma } from './prisma.client'

const getRandomIngredients = (max: number, min: number, count: number): { id: number }[] => {
    const countIds = Math.floor(Math.random() * (max - min + 1)) + min
    const ids: number[] = []
    for (let i = 0; i < count; i++) {
        ids.push(i + 1)
    }

    const result: number[] = []
    while (result.length < countIds) {
        const randomId = Math.floor(Math.random() * count) + 1
        if (!result.includes(randomId)) {
            result.push(randomId)
        }
    }
    return result.map(id => ({ id }))
}

const getRandomNumber = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

async function down() {
    await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
    await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
}

async function up() {
    await prisma.user.createMany({
        data: [
            {
                username: 'admin',
                password: hashSync('admin', 10),
                email: 'admin@mail.ru',
                avatar: 'uploads/admin.png',
            },

            {
                username: 'user',
                password: hashSync('user', 10),
                email: 'user@gmail.com',
                avatar: 'uploads/user.png',
            },
        ],
    }),
        await prisma.ingredient.createMany({
            data: [
                {
                    name: 'Сливочная моцарелла',
                    image: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A219740A95611EA0840DB86284E',
                    priceMin: getRandomNumber(20, 50),
                    priceAvg: getRandomNumber(50, 70),
                    priceMax: getRandomNumber(70, 90),
                },
                {
                    name: 'Сыры чеддер и пармезан',
                    image: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA69C1FE796',
                    priceMin: getRandomNumber(20, 50),
                    priceAvg: getRandomNumber(50, 70),
                    priceMax: getRandomNumber(70, 90),
                },
                {
                    name: 'Острый перец халапеньо',
                    image: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A219740A95611EA0840DB86284E',
                    priceMin: getRandomNumber(20, 50),
                    priceAvg: getRandomNumber(50, 70),
                    priceMax: getRandomNumber(70, 90),
                },
                {
                    name: 'Нежный цыпленок',
                    image: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA5B328D35A',
                    priceMin: getRandomNumber(20, 50),
                    priceAvg: getRandomNumber(50, 70),
                    priceMax: getRandomNumber(70, 90),
                },
                {
                    name: 'Красный лук',
                    image: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA60AE6464C',
                    priceMin: getRandomNumber(20, 50),
                    priceAvg: getRandomNumber(50, 70),
                    priceMax: getRandomNumber(70, 90),
                },
                {
                    name: 'Ветчина',
                    image: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA61B9A8D61',
                    priceMin: getRandomNumber(20, 50),
                    priceAvg: getRandomNumber(50, 70),
                    priceMax: getRandomNumber(70, 90),
                },
                {
                    name: 'Пикантная пепперони',
                    image: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA6258199C3',
                    priceMin: getRandomNumber(20, 50),
                    priceAvg: getRandomNumber(50, 70),
                    priceMax: getRandomNumber(70, 90),
                },
                {
                    name: 'Острая чоризо',
                    image: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA62D5D6027',
                    priceMin: getRandomNumber(20, 50),
                    priceAvg: getRandomNumber(50, 70),
                    priceMax: getRandomNumber(70, 90),
                },
                {
                    name: 'Маринованные огурчики',
                    image: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9EA89958D782B',
                    priceMin: getRandomNumber(20, 50),
                    priceAvg: getRandomNumber(50, 70),
                    priceMax: getRandomNumber(70, 90),
                },
                {
                    name: 'Шампиньоны',
                    image: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A22FA54A81411E9AFA67259A324',
                    priceMin: getRandomNumber(20, 50),
                    priceAvg: getRandomNumber(50, 70),
                    priceMax: getRandomNumber(70, 90),
                },
                {
                    name: 'Сочные ананасы',
                    image: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A21DA51A81211E9AFA6795BA2A0',
                    priceMin: getRandomNumber(20, 50),
                    priceAvg: getRandomNumber(50, 70),
                    priceMax: getRandomNumber(70, 90),
                },
                {
                    name: 'Свежие томаты',
                    image: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA7AC1A1D67',
                    priceMin: getRandomNumber(20, 50),
                    priceAvg: getRandomNumber(50, 70),
                    priceMax: getRandomNumber(70, 90),
                },
                {
                    name: 'Кубики брынзы',
                    image: 'https://cdn.dodostatic.net/static/Img/Ingredients/000D3A39D824A82E11E9AFA6B0FFC349',
                    priceMin: getRandomNumber(20, 50),
                    priceAvg: getRandomNumber(50, 70),
                    priceMax: getRandomNumber(70, 90),
                },
                {
                    name: 'Баварские колбаски',
                    image: 'https://cdn.dodostatic.net/static/Img/Ingredients/11ee9d3660793feda24a236677d3013e.png',
                    priceMin: getRandomNumber(20, 50),
                    priceAvg: getRandomNumber(50, 70),
                    priceMax: getRandomNumber(70, 90),
                },
                {
                    name: 'Креветки',
                    image: 'https://cdn.dodostatic.net/static/Img/Ingredients/11eee5d51d4c576da0f0db611c8947bd.png',
                    priceMin: getRandomNumber(20, 50),
                    priceAvg: getRandomNumber(50, 70),
                    priceMax: getRandomNumber(70, 90),
                },
                {
                    name: 'Сырный бортик',
                    image: 'https://cdn.dodostatic.net/static/Img/Ingredients/99f5cb91225b4875bd06a26d2e842106.png',
                    priceMin: getRandomNumber(20, 50),
                    priceAvg: getRandomNumber(50, 70),
                    priceMax: getRandomNumber(70, 90),
                },
            ],
        })
    await prisma.category.createMany({
        data: [
            {
                name: 'Пицца',
            },
            {
                name: 'Закуски',
            },
            {
                name: 'Десерты',
            },
            {
                name: 'Напитки',
            },
            {
                name: 'Кофе',
            },
            {
                name: 'Коктейли',
            },
            {
                name: 'Соусы',
            },
        ],
    })

    // Пиццы
    await prisma.product.create({
        data: {
            name: 'Чоризо Фреш',
            image: 'https://media.dodostatic.net/image/r:292x292/11EE7D627EDDDCD6851CB89CEFB18C47.avif',
            categoryId: 1,
            items: {
                createMany: {
                    data: [
                        {
                            name: 'Маленькая',
                            price: 549,
                            size: 'SMALL',
                            isThin: false,
                            isTraditional: true,
                        },
                        {
                            name: 'Средняя',
                            price: 819,
                            size: 'MEDIUM',
                            isThin: true,
                        },
                        {
                            name: 'Большая',
                            price: 999,
                            size: 'LARGE',
                            isThin: true,
                        },
                    ],
                },
            },
            ingredients: {
                connect: getRandomIngredients(12, 6, 16),
            },
            addivities: {
                connect: getRandomIngredients(12, 10, 16),
            },
        },
    })
    await prisma.product.create({
        data: {
            name: 'Сырный цыпленок',
            image: 'https://media.dodostatic.net/image/r:292x292/11EE7D610E8BBB248F31270BE742B4BD.avif',
            categoryId: 1,
            items: {
                createMany: {
                    data: [
                        {
                            name: 'Маленькая',
                            price: 549,
                            size: 'SMALL',
                            isThin: false,
                            isTraditional: true,
                        },
                        {
                            name: 'Средняя',
                            price: 819,
                            size: 'MEDIUM',
                            isThin: true,
                        },
                        {
                            name: 'Большая',
                            price: 999,
                            size: 'LARGE',
                            isThin: true,
                        },
                    ],
                },
            },
            ingredients: {
                connect: getRandomIngredients(12, 6, 16),
            },
            addivities: {
                connect: getRandomIngredients(12, 10, 16),
            },
        },
    })
    await prisma.product.create({
        data: {
            name: 'Додо',
            image: 'https://media.dodostatic.net/image/r:292x292/11EE7D6247650FAB9BC0FBA7E5E31424.avif',
            categoryId: 1,
            items: {
                createMany: {
                    data: [
                        {
                            name: 'Маленькая',
                            price: 549,
                            size: 'SMALL',
                            isThin: false,
                            isTraditional: true,
                        },
                        {
                            name: 'Средняя',
                            price: 819,
                            size: 'MEDIUM',
                            isThin: true,
                        },
                        {
                            name: 'Большая',
                            price: 999,
                            size: 'LARGE',
                            isThin: true,
                        },
                    ],
                },
            },
            ingredients: {
                connect: getRandomIngredients(12, 6, 16),
            },
            addivities: {
                connect: getRandomIngredients(12, 10, 16),
            },
        },
    })
    await prisma.product.create({
        data: {
            name: 'Четыре сезона',
            image: 'https://media.dodostatic.net/image/r:292x292/11EE897535FA1ABEB1C3330D305CDE4C.avif',
            categoryId: 1,
            items: {
                createMany: {
                    data: [
                        {
                            name: 'Маленькая',
                            price: 549,
                            size: 'SMALL',
                            isThin: false,
                            isTraditional: true,
                        },
                        {
                            name: 'Средняя',
                            price: 819,
                            size: 'MEDIUM',
                            isThin: true,
                        },
                        {
                            name: 'Большая',
                            price: 999,
                            size: 'LARGE',
                            isThin: true,
                        },
                    ],
                },
            },
            ingredients: {
                connect: getRandomIngredients(12, 6, 16),
            },
            addivities: {
                connect: getRandomIngredients(12, 10, 16),
            },
        },
    })
    await prisma.product.create({
        data: {
            name: 'Овощи и грибы',
            image: 'https://media.dodostatic.net/image/r:292x292/11EE7D61546D8483A61A0BBAA7ADCC78.avif',
            categoryId: 1,
            items: {
                createMany: {
                    data: [
                        {
                            name: 'Маленькая',
                            price: 549,
                            size: 'SMALL',
                            isThin: false,
                            isTraditional: true,
                        },
                        {
                            name: 'Средняя',
                            price: 819,
                            size: 'MEDIUM',
                            isThin: true,
                        },
                        {
                            name: 'Большая',
                            price: 999,
                            size: 'LARGE',
                            isThin: true,
                        },
                    ],
                },
            },
            ingredients: {
                connect: getRandomIngredients(12, 6, 16),
            },
            addivities: {
                connect: getRandomIngredients(12, 10, 16),
            },
        },
    })
    await prisma.product.create({
        data: {
            name: 'Мясная с аджикой',
            image: 'https://media.dodostatic.net/image/r:292x292/11EF438E93884BFEBFE79D11095AE2D4.avif',
            categoryId: 1,
            items: {
                createMany: {
                    data: [
                        {
                            name: 'Маленькая',
                            price: 359,
                            size: 'SMALL',
                            isThin: false,
                            isTraditional: true,
                        },
                        {
                            name: 'Средняя',
                            price: 619,
                            size: 'MEDIUM',
                            isThin: false,
                        },
                        {
                            name: 'Большая',
                            price: 799,
                            size: 'LARGE',
                            isThin: true,
                        },
                    ],
                },
            },
            ingredients: {
                connect: getRandomIngredients(12, 6, 16),
            },
            addivities: {
                connect: getRandomIngredients(12, 10, 16),
            },
        },
    })
    await prisma.product.create({
        data: {
            name: 'Ветчина и сыр',
            image: 'https://media.dodostatic.net/image/r:292x292/11EE7D60FDA22358AC33C6A44EB093A2.avif',
            categoryId: 1,
            items: {
                createMany: {
                    data: [
                        {
                            name: 'Маленькая',
                            price: 439,
                            size: 'SMALL',
                            isThin: false,
                            isTraditional: true,
                        },
                        {
                            name: 'Средняя',
                            price: 639,
                            size: 'MEDIUM',
                            isThin: false,
                        },
                        {
                            name: 'Большая',
                            price: 769,
                            size: 'LARGE',
                            isThin: true,
                        },
                    ],
                },
            },
            ingredients: {
                connect: getRandomIngredients(12, 6, 16),
            },
            addivities: {
                connect: getRandomIngredients(12, 10, 16),
            },
        },
    })
    await prisma.product.create({
        data: {
            name: 'Сырная',
            image: 'https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.avif',
            categoryId: 1,
            items: {
                createMany: {
                    data: [
                        {
                            name: 'Маленькая',
                            price: 299,
                            size: 'SMALL',
                            isThin: false,
                            isTraditional: true,
                        },
                        {
                            name: 'Средняя',
                            price: 559,
                            size: 'MEDIUM',
                            isThin: false,
                        },
                        {
                            name: 'Большая',
                            price: 639,
                            size: 'LARGE',
                            isThin: true,
                        },
                    ],
                },
            },
            ingredients: {
                connect: getRandomIngredients(12, 6, 16),
            },
            addivities: {
                connect: getRandomIngredients(12, 10, 16),
            },
        },
    })

    // Кофе
    await prisma.product.create({
        data: {
            name: 'Кофе Латте',
            image: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B0C26A3F85D97A78FEEE00AD.avif',
            categoryId: 5,
            description:
                'Когда хочется нежную молочную пенку, на помощь приходит классический латте',
            items: {
                createMany: {
                    data: [
                        {
                            name: '0.4 Л',
                            price: 299,
                            size: 'SMALL',
                            weight: 330,
                        },
                    ],
                },
            },
        },
    })
    await prisma.product.create({
        data: {
            name: 'Кофе Капучино',
            image: 'https://media.dodostatic.net/image/r:584x584/11EE7D61AE1813B4AB42D8927D061035.avif',
            categoryId: 5,
            description:
                'Король среди кофейных напитков — классический капучино. Для любителей сбалансированного кофейно-молочного вкуса',

            items: {
                createMany: {
                    data: [
                        {
                            name: '0.4 Л',
                            price: 159,
                            size: 'SMALL',
                            weight: 250,
                        },
                    ],
                },
            },
        },
    })
    await prisma.product.create({
        data: {
            name: 'Кофе Американо',
            image: 'https://media.dodostatic.net/image/r:292x292/11EE7D61B044583596548A59078BBD33.avif',
            categoryId: 5,
            description: 'Пара глотков горячего Американо, и вы будете готовы покорять этот день ',

            items: {
                createMany: {
                    data: [
                        {
                            name: '0.4 Л',
                            price: 109,
                            size: 'SMALL',
                            weight: 380,
                        },
                    ],
                },
            },
        },
    })

    // Закуски
    await prisma.product.create({
        data: {
            name: 'Дэнвич ветчина и сыр',
            image: 'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.avif',
            categoryId: 2,
            description:
                'Поджаристая чиабатта и знакомое сочетание ветчины, цыпленка, моцареллы со свежими томатами, соусом ранч и чесноком',
            items: {
                createMany: {
                    data: [
                        {
                            name: '1 ш.',
                            price: 279,
                            size: 'SMALL',
                            weight: 210,
                        },
                    ],
                },
            },
        },
    })
    await prisma.product.create({
        data: {
            name: 'Паста Карбонара',
            image: 'https://media.dodostatic.net/image/r:1875x1875/11EE797018746EF899D162D16FA99625.avif',
            categoryId: 2,
            description:
                'Паста из печи с беконом, сырами чеддер и пармезан, томатами, моцареллой, фирменным соусом альфредо и чесноком',
            items: {
                createMany: {
                    data: [
                        {
                            name: '1 ш.',
                            price: 349,
                            size: 'SMALL',
                            weight: 350,
                        },
                    ],
                },
            },
        },
    })
    await prisma.product.create({
        data: {
            name: 'Супермясной Додстер',
            image: 'https://media.dodostatic.net/image/r:1875x1875/11EE797022F9AD72AC34E1B01DC6AEBA.avif',
            categoryId: 2,
            description:
                'Горячая закуска с цыпленком, моцареллой, митболами, острыми колбасками чоризо и соусом бургер в тонкой пшеничной лепешке ',
            items: {
                createMany: {
                    data: [
                        {
                            name: '1 ш.',
                            price: 259,
                            size: 'SMALL',
                            weight: 160,
                        },
                    ],
                },
            },
        },
    })
    await prisma.product.create({
        data: {
            name: 'Додстер',
            image: 'https://media.dodostatic.net/image/r:292x292/11EE796FF0059B799A17F57A9E64C725.avif',
            categoryId: 2,
            description:
                'Легендарная горячая закуска с цыпленком, томатами, моцареллой, соусом ранч в тонкой пшеничной лепешке',
            items: {
                createMany: {
                    data: [
                        {
                            name: '1 ш.',
                            price: 219,
                            size: 'SMALL',
                            weight: 210,
                        },
                    ],
                },
            },
        },
    })
    await prisma.product.create({
        data: {
            name: 'Сырный Стартер',
            image: 'https://media.dodostatic.net/image/r:584x584/11EE796FF5E59E9886151E9F9A48BB1A.avif',
            categoryId: 2,
            description:
                'Горячая закуска с очень сырной начинкой. Моцарелла, пармезан, чеддер и соус ранч в тонкой пшеничной лепешке',
            items: {
                createMany: {
                    data: [
                        {
                            name: '1 ш.',
                            price: 209,
                            size: 'SMALL',
                            weight: 160,
                        },
                    ],
                },
            },
        },
    })
}

async function main() {
    try {
        down()
            .then(() =>
                up()
                    .then(() => console.log('done'))
                    .catch(e => console.error(e)),
            )
            .catch(e => console.error(e))
    } catch (e) {
        console.error(e)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async e => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
