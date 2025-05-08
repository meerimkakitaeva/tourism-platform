import mongoose from 'mongoose';
import crypto, { randomUUID } from 'crypto';
import config from './config';
import User from './models/User';
import Tour from './models/Tour';
import Guide from './models/Guide';
import TourReview from './models/TourReview';
import Order from './models/Order';
import News from './models/News';
import Employee from './models/Employee';
import GuideReview from './models/GuideReview';
import PlatformReview from './models/PlatformReview';
import TourRating from './models/TourRating';
import GuideRating from './models/GuideRating';
import Partner from './models/Partner';
import MainSlider from './models/MainSlider';
import ContactUs from './models/ContactUs';
import AboutUs from './models/AboutUs';
import GuideOrder from './models/GuideOrder';
import PartnerOrder from './models/PartnerOrder';
import StatisticsInfo from './models/StatisticsInfo';

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('tours');
    await db.dropCollection('guides');
    await db.dropCollection('orders');
    await db.dropCollection('news');
    await db.dropCollection('employees');
    await db.dropCollection('guidereviews');
    await db.dropCollection('platformreviews');
    await db.dropCollection('tourreviews');
    await db.dropCollection('tourratings');
    await db.dropCollection('guideratings');
    await db.dropCollection('partners');
    await db.dropCollection('mainsliders');
    await db.dropCollection('aboutus');
    await db.dropCollection('contacts');
    await db.dropCollection('guideorders');
    await db.dropCollection('partnerorders');
    await db.dropCollection('statisticsinfo');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [user, user1, user2, user3] = await User.create(
    {
      username: 'guide',
      email: 'guide@gmail.com',
      displayName: 'Guide',
      password: 'qwerty1234',
      role: 'guide',
      avatar: 'fixtures/mordecai.jpg',
      token: crypto.randomUUID(),
      verified: true,
    },
    {
      username: 'guide2',
      email: 'guide2@gmail.com',
      displayName: 'Guide2',
      password: 'qwerty1234',
      role: 'guide',
      avatar: 'fixtures/gumball.jpg',
      token: crypto.randomUUID(),
      verified: true,
    },
    {
      username: 'guide3',
      email: 'guide3@gmail.com',
      displayName: 'Guide3',
      password: 'qwerty1234',
      role: 'guide',
      avatar: 'fixtures/kuroro.jpeg',
      token: crypto.randomUUID(),
      verified: true,
    },
    {
      username: 'user',
      email: 'user@gmail.com',
      displayName: 'Chris',
      password: 'qwerty1234',
      role: 'user',
      avatar: 'fixtures/midjourney.webp',
      token: crypto.randomUUID(),
      verified: true,
    },
    {
      username: 'admin',
      email: 'admin@gmail.com',
      displayName: 'Admin',
      password: 'qwerty1234',
      role: 'admin',
      avatar: 'fixtures/admin.png',
      token: crypto.randomUUID(),
      verified: true,
    },
    {
      username: 'moderator',
      email: 'moderator@gmail.com',
      displayName: 'Moderator',
      password: 'qwerty1234',
      role: 'moderator',
      avatar: 'fixtures/moderator.jpg',
      token: crypto.randomUUID(),
      verified: true,
    },
  );

  const [Artem, Andrey, Askar] = await Guide.create(
    {
      user: user._id,
      description: {
        en: 'My name is Artem. I am a passionate guide with a deep love for the beauty and culture of Kyrgyzstan. I am fluent in Kyrgyz, Russian, and English.',
        ru: 'Меня зовут Артем. Я увлеченный гид с глубокой любовью к красоте и культуре Кыргызстана. Я свободно говорю на кыргызском, русском и английском языках.',
        kg: 'Меним атым Артем. Мен Кыргызстандын сүйүүсү мен маданиятына жакшы коргон, көп тилдүү гидим. Мен кыргызча, орусча жана англисче сөздөй айтам.',
      },
      languages: {
        en: ['Kyrgyz', 'Russian', 'English'],
        ru: ['Кыргызский', 'Русский', 'Английский'],
        kg: ['Кыргызча', 'Орусча', 'Англисче'],
      },
      country: {
        en: 'Kyrgyzstan',
        ru: 'Кыргызстан',
        kg: 'Кыргызстан',
      },
      isPublished: true,
    },
    {
      user: user1._id,
      description: {
        en: 'My name is Andrey. As a native of Kyrgyzstan, I am eager to share the hidden gems of my country with you. I speak Kyrgyz, Russian, and English.',
        ru: 'Меня зовут Андрей. Будучи коренным жителем Кыргызстана, я стремлюсь поделиться с вами скрытыми сокровищами моей страны. Я говорю на кыргызском, русском и английском языках.',
        kg: 'Меним атым Андрей. Мен Кыргызстандык эмесмин, ал эми Кыргызстандын жашырын жемиштерин сиз менен бөлүшүүгө кызыктам. Мен кыргызча, орусча жана англисче сөздөй айтам.',
      },
      languages: {
        en: ['Kyrgyz', 'Russian', 'English'],
        ru: ['Кыргызский', 'Русский', 'Английский'],
        kg: ['Кыргызча', 'Орусча', 'Англисче'],
      },
      country: {
        en: 'Kyrgyzstan',
        ru: 'Кыргызстан',
        kg: 'Кыргызстан',
      },
      isPublished: true,
    },
    {
      user: user2._id,
      description: {
        en: 'My name is Askar. I am a knowledgeable guide who is excited to help you explore Kyrgyzstan. I am fluent in Kyrgyz and English.',
        ru: 'Меня зовут Аскар. Я знающий гид, который с радостью поможет вам исследовать Кыргызстан. Я свободно говорю на кыргызском и английском языках.',
        kg: 'Меним атым Аскар. Мен Кыргызстанды изилдөөгө жардам берүүгө кызыктуу, билимдүү гидим. Мен кыргызча жана англисче сөздөй айтам.',
      },
      languages: {
        en: ['Kyrgyz', 'English'],
        ru: ['Кыргызский', 'Английский'],
        kg: ['Кыргызча', 'Англисче'],
      },
      country: {
        en: 'Kyrgyzstan',
        ru: 'Кыргызстан',
        kg: 'Кыргызстан',
      },
      isPublished: true,
    },
  );

  const [Burana, Canyon, IssykKul, Osh, SaryChelek, Naryn, AlaKul] =
    await Tour.create(
      {
        guides: [Artem._id, Andrey._id],
        name: {
          en: 'Explore Burana Tower',
          ru: 'Исследуйте башню Бурана',
          kg: 'Бурана мунарасын изилдениз',
        },
        mainImage: 'fixtures/burana.jpeg',
        description: {
          en: "The Burana Tower is a large minaret in the Chuy Valley in northern Kyrgyzstan. It is located about 80 km east of the country's capital Bishkek, near the town of Tokmok. The tower, along with grave markers, some earthworks and the remnants of a castle and three mausoleums, is all that remains of the ancient city of Balasagun, which was established by the Karakhanids at the end of the 9th century. The tower was built in the 11th century and was used as a template for other minarets. An external staircase and steep, winding stairway inside the tower enables visitors to climb to the top. It is one of the oldest architectural constructions in Central Asia.",
          ru: 'Башня Бурана — большой минарет в Чуйской долине на севере Киргизии. Он расположен примерно в 80 км к востоку от столицы страны Бишкека, недалеко от города Токмок. Башня вместе с надгробиями, некоторыми земляными валами, остатками замка и трех мавзолеев — это все, что осталось от древнего города Баласагун, основанного Караханидами в конце 9 века. Башня была построена в 11 веке и использовалась в качестве образца для других минаретов. Внешняя лестница и крутая винтовая лестница внутри башни позволяют посетителям подняться на вершину. Это одно из старейших архитектурных сооружений Центральной Азии.',
          kg: 'Бурана мунарасы — Кыргызстандын түндүгүндөгү Чүй өрөөнүндөгү чоң мунара. Ал өлкөнүн борбору Бишкектен 80 км чыгыш тарапта, Токмок шаарына жакын жайгашкан. Мунара мүрзө белгилери, кээ бир жер жумуштары жана сепилдин жана үч күмбөздүн калдыктары менен бирге 9-кылымдын аягында Караханиддер тарабынан түптөлгөн байыркы Баласагун шаарынан калган нерсе. Мунара 11-кылымда курулган жана башка мунаралар үчүн шаблон катары колдонулган. Мунаранын ичиндеги тышкы тепкич жана тик, ийри-буйру тепкич зыяратчыларга чокуга чыгууга мүмкүнчүлүк берет. Бул Орто Азиядагы эң байыркы архитектуралык курулуштардын бири.',
        },
        category: ['history', 'exotic'],
        price: 800,
        discountPrice: 499,
        duration: 1,
        plan: [
          {
            title: {
              en: 'Visiting Burana Tower',
              ru: 'Поход к башне Бурана',
              kg: 'Бурана мунарасында сейилдөө',
            },
            planDescription: {
              en: 'In the morning you’ll be picked up from a hotel to start your exciting tour. We’ll head towards Burana Tower to the small town of Tokmok (80km from Bishkek). Your guide will show you the mausoleums and other buildings discovered by archaeologists during excavations, you will have a chance to climb to the top of the ancient tower, where there is a beautiful view of the Chui valley and the Tien-Shan mountains open.',
              ru: 'Утром вас заберут из отеля, чтобы начать захватывающий тур. Направимся в сторону башни Бурана в небольшой город Токмок (80 км от Бишкека). Ваш гид покажет вам мавзолеи и другие постройки, обнаруженные археологами при раскопках, у вас будет возможность подняться на вершину древней башни, откуда открывается прекрасный вид на Чуйскую долину и горы Тянь-Шаня.',
              kg: 'Эртең менен сизди кызыктуу тур баштоо үчүн мейманканадан алып кетишет. Бурана мунарасын көздөй, Токмок шаарына (Бишкектен 80 км) карай бет алабыз. Сиздин гид археологдор тарабынан казуу иштеринин жүрүшүндө табылган күмбөздөрдү жана башка имараттарды көрсөтөт, сиз Чүй өрөөнүнүн жана Тянь-Шань тоолору ачык кооз көрүнүшү бар байыркы мунаранын чокусуна чыгууга мүмкүнчүлүк аласыз.',
            },
          },
        ],
        destination: {
          en: 'Tokmak, Burana Tower',
          ru: 'Токмак, Башня Бурана',
          kg: 'Токмок, Бурана мунарасы',
        },
        arrival: {
          en: 'Akhunbaev st. 75',
          ru: 'Ахунбаева 75',
          kg: 'Ахунбаев 75',
        },
        departure: { en: '10:00 PM', ru: '10:00 PM', kg: '10:00 PM' },
        dressCode: {
          en: 'Casual. Comfortable athletic clothing, hiking shoes.',
          ru: 'Повседневный. Удобная спортивная одежда, походная обувь.',
          kg: 'Күнүмдүк. Ыңгайлуу спорттук кийимдер, сейилдөө бут кийимдери.',
        },
        included: {
          en: ['Museum Tickets', 'Group Guide', 'Transport'],
          ru: ['Билеты в музей', 'Группа гидов', 'Транспорт'],
          kg: ['Музейге билеттер', 'Гиддер тобу', 'Транспорт'],
        },
        galleryTour: ['fixtures/burana.jpeg', 'fixtures/burana2.jpeg'],
        country: { en: 'Kyrgyzstan', ru: 'Кыргызстан', kg: 'Кыргызстан' },
        isPublished: true,
        date: '26/01/2024',
        map: `<iframe src='https://www.google.com/maps/d/embed?mid=1BeIDSQaVcIhrNblCMEUy6RI4sPFEjtQ&ehbc=2E312F&noprof=1' width='640' height='480'></iframe>`,
        mapLink:
          'https://www.google.com/maps/d/edit?mid=1BeIDSQaVcIhrNblCMEUy6RI4sPFEjtQ&usp=sharing',
      },
      {
        guides: [Askar._id, Andrey._id],
        name: {
          en: 'Fairytale Canyon Skazka Tour',
          ru: 'Тур по каньону Сказка',
          kg: '"Сказка" капчыгайына саякат',
        },
        mainImage: 'fixtures/canyon-skazka.jpeg',
        description: {
          en: 'Skazka (Fairy Tale) Canyon, located on the southern shore of Issyk-Kul Lake, is one of the most interesting and frequently visited natural places in Kyrgyzstan. It is located 120 kilometers from Balykchi and not far from the village of Tosor. The canyon is located in the gorge of the same name and is famous for its red clay rocks. The wind has been polishing natural and fabulous sculptures here for years. One of the most famous rocks is the "Chinese Wall". So it was nicknamed by the people due to its similarity to the famous architectural monument of China. Walking through the labyrinths of the canyon, you will feel like in a real fairy tale. No wonder the gorge is named that way. The rocks resemble castles, towers, monsters, giants, people and animals. And all this is created by nature, not by the hands of people.',
          ru: 'Каньон Сказка, расположенный на южном берегу озера Иссык-Куль, является одним из самых интересных и часто посещаемых природных мест Кыргызстана. Он расположен в 120 километрах от Балыкчи и недалеко от села Тосор. Каньон расположен в одноименном ущелье и славится своими скалами из красной глины. Ветер уже много лет полирует здесь природные и сказочные скульптуры. Одна из самых известных скал – «Китайская стена». Так его прозвали в народе из-за сходства со знаменитым архитектурным памятником Китая. Прогуливаясь по лабиринтам каньона, вы почувствуете себя в настоящей сказке. Недаром ущелье названо именно так. Скалы напоминают замки, башни, монстров, великанов, людей и животных. И все это создано природой, а не руками людей.',
          kg: 'Ысык-Көлдүн түштүк жээгинде жайгашкан Сказка (Жомок) каньоны Кыргызстандын эң кызыктуу жана көп баруучу жаратылыш жерлеринин бири. Балыкчы шаарынан 120 чакырым алыстыкта, Тосор айылынан анча алыс эмес жерде жайгашкан. Каньон ушул эле аталыштагы капчыгайда жайгашкан жана кызыл чопо тектери менен белгилүү. Шамал бул жерде бир нече жылдар бою табигый жана жомоктогудай скульптураларды жылмалап турат. Атактуу аскалардын бири - "Кытай дубалы". Ошентип, Кытайдын атактуу архитектуралык эстелигине окшоштугунан улам эл тарабынан лакап атка ээ болгон. Каньондун лабиринттерин аралап жүрүп, өзүңүздү чыныгы жомоктогудай сезесиз. Капчыгайдын ушундай аталышы бекеринен эмес. Аскалар сепилдерге, мунараларга, желмогуздарга, алптарга, адамдарга жана жаныбарларга окшош. Ал эми мунун баарын адамдын колу эмес, табият жаратат.',
        },
        category: ['history', 'popular', 'exotic'],
        price: 2000,
        discountPrice: 1500,
        duration: 1,
        plan: [
          {
            title: {
              en: 'Visiting canyon "Skazka"',
              ru: 'Поход к каньону "Сказка"',
              kg: '"Сказка" капчыгайына саякат',
            },
            planDescription: {
              en: 'Moving along the south coast of Issyk-Kul lake from Karakol town, before you reach the small village named Kadji-Sai, you have an opportunity to get into the most beautiful mountain landscapes.Turning after Tosor village towards Terskey Ala-Too mountains and after passing about 4 km, we will notice how mountains part, and immediately, as if by the wave of a magic stick we will find ourselves in this valley of fairytales. In Russian, the word Skazka means “Fairy Tale” and the place is certainly a magical place, full of mystery and mysticism, sufficuent to stimulate the imagination of those with the inclination to stand, and stare, and wonder.',
              ru: 'Двигаясь вдоль южного побережья озера Иссык-Куль от города Каракол, не доезжая до небольшого села Каджи-Сай, у вас есть возможность попасть в красивейшие горные пейзажи. Повернув после села Тосор в сторону гор Терскей Ала-Тоо и после Пройдя около 4 км, мы заметим, как горы расходятся, и сразу, как по мановению волшебной палочки, мы попадаем в эту долину сказок. На русском слово «Сказка» означает «Сказка», и это место, безусловно, волшебное, полное тайн и мистицизма, достаточное для стимулирования воображения тех, кто склонен стоять, смотреть и удивляться.',
              kg: 'Каракол шаарынан Ысык-Көлдүн түштүк жээгин бойлой жылып, Кажы-Сай деген чакан айылга жеткенге чейин сиз тоолордун эң кооз пейзаждарын көрүүгө мүмкүнчүлүк аласыз. 4 чакырымдай өтүп, тоолор кантип бөлүнгөнүн байкайбыз да, дароо сыйкырдуу таяктын толкуну менен ушул жомоктордун өрөөнүнө кирип калабыз. Орус тилинен которгондо Сказка деген сөз «Жомок» дегенди билдирет жана бул жер, албетте, сыйкырдуу жер, сырга жана мистикага толгон, туруп, тиктеп, таң калууга ыктагандардын элестетүүсүнө жетишерлик.',
            },
          },
        ],
        destination: {
          en: 'Canyon Skazka',
          ru: 'Каньон Сказка',
          kg: '"Сказка" капчыгайы',
        },
        arrival: {
          en: 'Akhunbaev st. 75',
          ru: 'Ахунбаева 75',
          kg: 'Ахунбаев 75',
        },
        departure: { en: '10:00 PM', ru: '10:00 PM', kg: '10:00 PM' },
        dressCode: {
          en: 'Casual. Comfortable athletic clothing, hiking shoes.',
          ru: 'Повседневный. Удобная спортивная одежда, походная обувь.',
          kg: 'Күнүмдүк. Ыңгайлуу спорттук кийимдер, сейилдөө бут кийимдери.',
        },
        included: {
          en: ['Lunch', 'Group Guide', 'Transport'],
          ru: ['Обед', 'Группа гидов', 'Транспорт'],
          kg: ['Түшкү тамак', 'Гиддер тобу', 'Транспорт'],
        },
        galleryTour: ['fixtures/canyon-skazka.jpeg'],
        country: { en: 'Kyrgyzstan', ru: 'Кыргызстан', kg: 'Кыргызстан' },
        isPublished: true,
        date: '26/01/2024',
        map: `<iframe src='https://www.google.com/maps/d/embed?mid=1BeIDSQaVcIhrNblCMEUy6RI4sPFEjtQ&ehbc=2E312F&noprof=1' width='640' height='480'></iframe>`,
        mapLink:
          'https://www.google.com/maps/d/edit?mid=1BeIDSQaVcIhrNblCMEUy6RI4sPFEjtQ&usp=sharing',
      },
      {
        guides: [Artem._id, Askar._id],
        name: {
          en: 'Isskyl-Lake - the pearl of Kyrgyzstan',
          ru: 'Иссык-Куль - жемчужина Кыргызстана',
          kg: 'Ыссык-Көл - Кыргызстандын бермети',
        },
        mainImage: 'fixtures/issyk-kul.jpeg',
        description: {
          en: 'Issyk-Kul tours is a journey to the second largest salt lake and sixth deepest lake in the world. Entitled Kyrgyz Baikal for its enormous size, Issyk-Kul does not freeze in winter. The combination of sea and mountainous climate, coniferous forests, thermal springs make Issyk-Kul the place, where your body and soul can rest. Issyk-Kul Lake is surrounded by many intersting sights, including Stone garden withpetroglyphs datingback to the 2000 B.C - 4th century A.D and the cultural center Ruh-Ordo with an old chapel to honor four confessions of the world.',
          ru: 'Туры на Иссык-Куль – это путешествие ко второму по величине соленому озеру и шестому по глубине озеру мира. Названный Киргизским Байкалом за свои огромные размеры, Иссык-Куль не замерзает зимой. Сочетание морского и горного климата, хвойных лесов, термальных источников делают Иссык-Куль местом, где можно отдохнуть душой и телом. Озеро Иссык-Куль окружено множеством интересных достопримечательностей, в том числе Каменным садом с петроглифами 2000 г. до н.э. – 4 веком н.э. и культурным центром Рух-Ордо со старинной часовней в честь четырех конфессий мира.',
          kg: 'Ысык-Көл турлары дүйнөдөгү экинчи чоң туздуу көлгө жана тереңдиги боюнча алтынчы көлгө саякат. Эбегейсиз чоңдугу үчүн Кыргыз Байкалы деп аталган Ысык-Көл кышында тоңбойт. Деңиз менен тоолуу климаттын, ийне жалбырактуу токойлордун, термалдык булактардын айкалышы Ысык-Көлдү денеңиз менен жаныңыз эс ала турган жайга айландырат. Ысык-Көл көптөгөн кызыктуу жерлер менен курчалган, анын ичинде биздин заманга чейинки 2000-жылдан биздин замандын 4-кылымына таандык петроглифтери бар Таш бакча жана дүйнөнүн төрт конфессиясын даңазалоо үчүн эски часовнясы бар Рух-Ордо маданий борбору.',
        },
        category: ['history', 'on budget'],
        price: 6000,
        discountPrice: 4999,
        duration: 3,
        plan: [
          {
            title: {
              en: 'From Bishkek to Chon Kemin',
              ru: 'От Бишкека до Чон-Кемина',
              kg: 'Бишкектен ЧОн-Кеминге чейин',
            },
            planDescription: {
              en: 'Pick-up in the morning in Bishkek (address to be confirmed). Leave the bustle of Bishkek behind and travel across to Kyrgyzstan to the incredible Chon-Kemin Valley, a protected region which is home to some of the most diverse flora and fauna in the country.After a short rest and check-in, enjoy a home-cooked lunch at the guesthouse terrace with a panoramic view of the surrounding mountains and village. Before dinner take a gentle stroll around the village and glean a fascinating insight into rural Kyrgyz life. Possible to do a hiking tour to Chon-Kemin area.',
              ru: 'Встреча утром в Бишкеке (адрес уточняется). Оставьте суету Бишкека позади и отправляйтесь в Кыргызстан, в невероятную Чон-Кеминскую долину, охраняемый регион, в котором обитает одна из самых разнообразных флоры и фауны в стране. После короткого отдыха и регистрации насладитесь домашним уютом. - приготовленный обед на террасе гостевого дома с панорамным видом на окружающие горы и деревню. Перед ужином прогуляйтесь по деревне и получите увлекательное представление о сельской жизни кыргызов. Возможна пешая экскурсия в район Чон-Кемина.',
              kg: 'Эртең менен Бишкектен алып кетүү (дареги такталат). Бишкектин ызы-чуусун артта калтырып, Кыргызстанды аралап, укмуштуудай Чоң-Кемин өрөөнүнө саякаттаңыз, өлкөнүн эң ар түрдүү флора жана фаунасынын мекени болгон корголуучу аймак. Кыска эс алып, каттоодон өткөндөн кийин, үйүңүздөн ырахат алыңыз. - курчап турган тоолордун жана айылдын панорамалык көрүнүшү бар конок үйүнүн террасасында бышырылган түшкү тамак. Кечки тамактан мурун айылды кыдырып, кыргыздын элеттик жашоосу тууралуу кызыктуу маалымат алыңыз. Чоң-Кемин аймагына жөө саякат жасаса болот.',
            },
          },
          {
            title: {
              en: 'From Chon Kemin to Karakol',
              ru: 'От Чон Кемина до Каракола.',
              kg: 'Чоң Кеминден Караколго чейин',
            },
            planDescription: {
              en: 'After a nice village style breakfast at the guesthouse, depart to Karakol through the northern shore of the Issyk-Kul Lake. On the way, stop in Cholpon-Ata town. Visit open-air Museum of Petroglyphs (stone inscriptions) that contains more than 2000 petroglyphs dating from 800 BC to 1200 AD. Continue driving to Karakol. Evening free time in Karakol.',
              ru: 'После хорошего деревенского завтрака в гостевом доме отправляйтесь в Каракол через северный берег озера Иссык-Куль. По пути остановка в городе Чолпон-Ата. Посетите Музей петроглифов (каменных надписей) под открытым небом, в котором хранится более 2000 петроглифов, датируемых периодом с 800 г. до н.э. по 1200 г. н.э. Продолжение пути в Каракол. Вечер свободное время в Караколе.',
              kg: 'Конок үйүндө айыл стилиндеги жагымдуу эртең мененки тамактан кийин, Ысык-Көлдүн түндүк жээги аркылуу Караколго жөнөйбүз. Жолдо Чолпон-Ата шаарына токтойбуз. Биздин заманга чейинки 800-жылдан 1200-жылга чейинки 2000ден ашык петроглифтерди камтыган ачык асман алдындагы Петроглифтер музейине (таш жазуулар) барыңыз. Караколго чейин айдай бер. Каракол шаарында кечки бош убакыт.',
            },
          },
          {
            title: {
              en: 'From Karakol to Jeti Oguz and back to Bishkek',
              ru: 'Из Каракола в Джети-Огуз и обратно в Бишкек.',
              kg: 'Караколдон Жети-Өгүзгө жана кайра Бишкекке',
            },
            planDescription: {
              en: 'After an early breakfast the guesthouse drive to Jety Oguz valley where shepherds share many legends about the beautiful, famous, red rocks known as «Seven Bulls» and «Broken Heart». At the base of the cliffs are flat mountain slopes, thickly overgrown with grass and pine trees. The “Broken Heart” rock, located at the entrance to the gorge, offers an especially romantic scene. In Bokonbaevo village, enjoy home-cooked lunch at a local Kyrgyz family’s house. Visit Fairy Tale Canyon with a short hiking tour for 1-2 hrs (weather dependant). Before evening arrive to Bishkek. Drop-off at final destination. End of services.',
              ru: 'После раннего завтрака выезд в гостевой дом в долину Джеты-Огуз, где пастухи рассказывают множество легенд о красивых, знаменитых красных скалах, известных как «Семь быков» и «Разбитое сердце». У подножия скал лежат плоские горные склоны, густо поросшие травой и соснами. Особенно романтическую сцену представляет скала «Разбитое сердце», расположенная у входа в ущелье. В селе Боконбаево насладитесь домашним обедом в доме местной кыргызской семьи. Посетите Каньон Сказки, совершив короткую пешеходную экскурсию продолжительностью 1-2 часа (в зависимости от погоды). К вечеру прибытие в Бишкек. Высадка в конечном пункте назначения. Конец услуг.',
              kg: 'Эртең мененки тамактан кийин конок үйү Жети-Өгүз өрөөнүнө жөнөйт, анда чабандар «Жети өгүз» жана «Сынган жүрөк» деп аталган кооз, атактуу, кызыл таштар жөнүндө көптөгөн уламыштарды айтып беришет. Аскалардын түбүндө чөп, карагайлар калың өскөн жалпак тоо капталдары жатат. Капчыгайдын кире беришинде жайгашкан "Сынган жүрөк" ташы өзгөчө романтикалык көрүнүштү тартуулайт. Бөкөнбаев айылында жергиликтүү кыргыз үй-бүлөлөрүнүн үйүндө даярдалган түшкү тамактан ырахат алыңыз. 1-2 саатка кыска жөө саякат менен Жомок каньонуна барыңыз (аба ырайына жараша). Кечке чейин Бишкекке келет. Акыркы көздөгөн жерге түшүрүү. Кызматтардын бүтүшү.',
            },
          },
        ],
        destination: {
          en: 'Lake Issyk-Kul',
          ru: 'Озеро Иссык-Куль',
          kg: 'Ысык-Кол',
        },
        arrival: {
          en: 'Akhunbaev st. 75',
          ru: 'Ахунбаева 75',
          kg: 'Ахунбаев 75',
        },
        departure: { en: '11:30 PM', ru: '11:30 PM', kg: '11:30 PM' },
        dressCode: {
          en: 'Casual. Comfortable athletic clothing, hiking shoes.',
          ru: 'Повседневный. Удобная спортивная одежда, походная обувь.',
          kg: 'Күнүмдүк. Ыңгайлуу спорттук кийимдер, сейилдөө бут кийимдери.',
        },
        included: ['Museum Tickets', 'Group Guide', 'Transport'],
        galleryTour: ['fixtures/issyk-kul.jpeg'],
        country: { en: 'Kyrgyzstan', ru: 'Кыргызстан', kg: 'Кыргызстан' },
        isPublished: true,
        date: '27/01/2024',
        map: `<iframe src='https://www.google.com/maps/d/embed?mid=1BeIDSQaVcIhrNblCMEUy6RI4sPFEjtQ&ehbc=2E312F&noprof=1' width='640' height='480'></iframe>`,
        mapLink:
          'https://www.google.com/maps/d/edit?mid=1BeIDSQaVcIhrNblCMEUy6RI4sPFEjtQ&usp=sharing',
      },
      {
        guides: [Andrey._id, Askar._id],
        name: {
          en: 'Tour around the Osh city',
          ru: 'Тур по городу Ош',
          kg: 'Ош шаарына саякат',
        },
        mainImage: 'fixtures/osh.jpeg',
        description: {
          en: 'Osh tour will introduce you one of the most ancient cities of Central Asia and the second largest city in Kyrgyzstan. The main sight of Osh is the mountain Solomons Throne that had been the second Mecca for local Muslims. Legends have endowed the mountain with the might able to heal any disease. There is a museum-reserve inside the mountain consisting of artificial and natural caves. Another sight worth a visit is Shaid Tepa, the largest mosque in Kyrgyzstan.',
          ru: 'Тур по Ошу познакомит вас с одним из древнейших городов Центральной Азии и вторым по величине городом Кыргызстана. Главной достопримечательностью Оша является гора Трон Соломона, которая была второй Меккой для местных мусульман. Легенды наделили гору силой, способной исцелить любую болезнь. Внутри горы находится музей-заповедник, состоящий из искусственных и естественных пещер. Еще одна достопримечательность, которую стоит посетить, — Шаид Тепа, крупнейшая мечеть Кыргызстана.',
          kg: 'Ош туру сиздерди Борбордук Азиядагы эң байыркы шаарлардын бири жана Кыргызстандын экинчи чоң шаары менен тааныштырат. Оштун негизги көрүнүшү – жергиликтүү мусулмандар үчүн экинчи Мекке болгон Сулайман тактысы. Уламыштарда тоого ар кандай ооруну айыктыра турган күч берилген. Тоонун ичинде жасалма жана табигый үңкүрлөрдөн турган музей-корук бар. Барууга арзырлык дагы бир жай – Кыргызстандагы эң чоң мечит – Шайд Тепа.',
        },
        category: ['vacation', 'popular'],
        price: 6900,
        discountPrice: 6000,
        duration: 3,
        plan: [
          {
            title: {
              en: 'From Bishkek to Osh',
              ru: 'От Бишкека до Оша',
              kg: 'Бишкектен Ошко чейин',
            },
            planDescription: {
              en: 'In the morning transfer to the airport in Bishkek to take a plane to Osh. Arrive in Osh and start the city tour. As legends say, Osh was founded by King Solomon ages ago and had an important position on trading routes of the Great Silk Road. Today you will visit Suleiman-Too (Solomon’s Mountain), museum, Osh bazaar – this market locates at the same place as in the times of Great Silk Road. Overnight in the guest house.',
              ru: 'Утром трансфер в аэропорт Бишкека для вылета на самолет в Ош. Прибытие в Ош и начало экскурсии по городу. Как гласят легенды, Ош был основан царем Соломоном много лет назад и занимал важное положение на торговых путях Великого Шелкового пути. Сегодня вы посетите Сулейман-Тоо (Соломонова гора), музей, Ошский базар – этот рынок находится на том же месте, что и во времена Великого Шелкового пути. Ночь в гостевом доме.',
              kg: 'Эртең менен Бишкектин аэропортуна учуп, Ошко учакка түшүү. Ошко келип, шаарды кыдыруу. Уламыштарда айтылгандай, Ош кылымдар мурун Сулайман падыша тарабынан негизделген жана Улуу Жибек жолунун соода жолдорунда маанилүү позицияга ээ болгон. Бүгүн сиз Сулайман-Тоого, музейге, Ош базарына барасыз – бул базар Улуу Жибек Жолунун убагындагыдай эле жерде жайгашкан. Конок үйүндө түнөө.',
            },
          },
          {
            title: {
              en: 'Exploring Osh',
              ru: 'От Бишкека до Оша',
              kg: 'Бишкектен Ошко чейин',
            },
            planDescription: {
              en: 'Whole day exploring Osh with our guide! Vizit best places, eat most tasty dishes etc.',
              ru: 'Целый день знакомства с Ошем с нашим гидом! Посещайте лучшие места, ешьте самые вкусные блюда и т. д.',
              kg: 'Биздин гид менен бир күн бою Ошту изилдөө! Эң жакшы жерлерге барыңыз, эң даамдуу тамактарды жеңиз ж.б.',
            },
          },
          {
            title: {
              en: 'From Osh back to Bishkek',
              ru: 'От Бишкека до Оша',
              kg: 'Бишкектен Ошко чейин',
            },
            planDescription: {
              en: 'Transfer to the airport (30 km). End of the tour.',
              ru: 'Трансфер в аэропорт (30 км). Конец тура.',
              kg: 'Аэропортко жеткирүү (30 км). Турдун аягы.',
            },
          },
        ],
        destination: { en: 'Osh city', ru: 'Город Ош', kg: 'Ош шаары' },
        arrival: {
          en: 'Akhunbaev st. 75',
          ru: 'Ахунбаева 75',
          kg: 'Ахунбаев 75',
        },
        departure: { en: '11:00 PM', ru: '11:00 PM', kg: '11:00 PM' },
        dressCode: {
          en: 'Casual. Comfortable athletic clothing, hiking shoes.',
          ru: 'Повседневный. Удобная спортивная одежда, походная обувь.',
          kg: 'Күнүмдүк. Ыңгайлуу спорттук кийимдер, сейилдөө бут кийимдери.',
        },
        included: {
          en: ['Group Guide', 'Transport', 'Guesthouse', 'Food'],
          ru: ['Группа гидов', 'Транспорт', 'Гостевой дом', 'Питание'],
          kg: ['Гиддер тобу', 'Транспорт', 'Конок үй', 'Тамактануу'],
        },
        galleryTour: ['fixtures/osh.jpeg'],
        country: { en: 'Kyrgyzstan', ru: 'Кыргызстан', kg: 'Кыргызстан' },
        isPublished: true,
        date: '25/01/2024',
        map: `<iframe src='https://www.google.com/maps/d/embed?mid=1BeIDSQaVcIhrNblCMEUy6RI4sPFEjtQ&ehbc=2E312F&noprof=1' width='640' height='480'></iframe>`,
        mapLink:
          'https://www.google.com/maps/d/edit?mid=1BeIDSQaVcIhrNblCMEUy6RI4sPFEjtQ&usp=sharing',
      },
      {
        guides: [Andrey._id, Artem._id],
        name: {
          en: 'Ancient Naryn town Tour',
          ru: 'Тур по древнему городу Нарын',
          kg: 'Байыркы Нарын шаарына саякат',
        },
        mainImage: 'fixtures/naryn.jpeg',
        description: {
          en: 'Naryn town is the administrative center of the Naryn Region. The town is situated on the banks of the Naryn River (the main headwaters of the Syr Darya). Naryn is the main path of the Great Silk Road, today it connects China, via Torugart Pass. The population of the Naryn Region is 99% kyrgyz',
          ru: 'Город Нарын является административным центром Нарынской области. Город расположен на берегу реки Нарын (главного истока Сырдарьи). Нарын – главный путь Великого Шелкового пути, сегодня он соединяет Китай через перевал Торугарт. Население Нарынской области на 99% состоит из кыргызов.',
          kg: 'Нарын шаары - Нарын облусунун административдик борбору. Шаар Нарын дарыясынын (Сыр-Дарыянын негизги башы) жээгинде жайгашкан. Нарын – Улуу Жибек жолунун негизги жолу, бүгүнкү күндө Кытайды Торугарт ашуусу аркылуу байланыштырып турат. Нарын облусунун калкынын 99% кыргыздар',
        },
        category: ['history', 'popular'],
        price: 4500,
        duration: 2,
        plan: [
          {
            title: {
              en: 'From Bishkek to Naryn',
              ru: 'От Бишкека до Нарына',
              kg: 'Бишкектен Нарынга чейин',
            },
            planDescription: {
              en: 'In the morning transfer to the Naryn city. Stay in the guesthouse, dinner.',
              ru: 'Утром переезд в город Нарын. Размещение в гостевом доме, ужин.',
              kg: 'Эртең менен Нарын шаарына көчүү. Мейманканада бол, кечки тамак.',
            },
          },
          {
            title: {
              en: 'Exploring Naryn',
              ru: 'От Бишкека до Нарына',
              kg: 'Бишкектен Нарынга чейин',
            },
            planDescription: {
              en: 'Whole morning exploring Naryn with our guide! After lunch, transfer back to Bishkek.',
              ru: 'Целое утро исследуем Нарын с нашим гидом! После обеда трансфер обратно в Бишкек.',
              kg: 'Эртең менен биздин гид менен Нарынды кыдыруу! Түшкү тамактан кийин кайра Бишкекке жөнөйбүз.',
            },
          },
        ],
        destination: { en: 'Naryn', ru: 'Нарын', kg: 'Нарын' },
        arrival: {
          en: 'Akhunbaev st. 75',
          ru: 'Ахунбаева 75',
          kg: 'Ахунбаев 75',
        },
        departure: { en: '11:00 PM', ru: '11:00 PM', kg: '11:00 PM' },
        dressCode: {
          en: 'Casual. Comfortable athletic clothing, hiking shoes.',
          ru: 'Повседневный. Удобная спортивная одежда, походная обувь.',
          kg: 'Күнүмдүк. Ыңгайлуу спорттук кийимдер, сейилдөө бут кийимдери.',
        },
        included: {
          en: ['Group Guide', 'Transport', 'Guesthouse', 'Food'],
          ru: ['Группа гидов', 'Транспорт', 'Гостевой дом', 'Питание'],
          kg: ['Гиддер тобу', 'Транспорт', 'Конок үй', 'Тамактануу'],
        },
        galleryTour: ['fixtures/sary-chelek.jpeg', 'fixtures/naryn.jpeg'],
        country: { en: 'Kyrgyzstan', ru: 'Кыргызстан', kg: 'Кыргызстан' },
        isPublished: true,
        date: '28/01/2024',
        map: `<iframe src='https://www.google.com/maps/d/embed?mid=1BeIDSQaVcIhrNblCMEUy6RI4sPFEjtQ&ehbc=2E312F&noprof=1' width='640' height='480'></iframe>`,
        mapLink:
          'https://www.google.com/maps/d/edit?mid=1BeIDSQaVcIhrNblCMEUy6RI4sPFEjtQ&usp=sharing',
      },
      {
        guides: [Andrey._id, Artem._id],
        name: {
          en: 'Amazing Tour to the Sary-Chelek',
          ru: 'Удивительный тур по озеру Сары-Челек',
          kg: 'Кереметтүү Сары-Челек көлүнө саякат',
        },
        mainImage: 'fixtures/sary-chelek.jpeg',
        description: {
          en: 'Sary Chelek is located in the Jalal-Abad region in the west of Kyrgyzstan, tucked into the Western Tien Shan Mountains at the foot of the Chatkal Mountain Range. This alpine lake is the highlight of a larger area called Sary Chelek Nature Reserve which has been declared as a UNESCO Biosphere Reserve in 1978. The reserve has seven alpine lakes with Sary Chelek Lake being the largest one. Located at an altitude of 1887 meters and created by a landslide, the lake covers almost 500 hectares. The depth varies across the lake, with its deepest point at 245 meters.',
          ru: 'Сары-Челек расположен в Джалал-Абадской области на западе Кыргызстана, в горах Западного Тянь-Шаня, у подножия Чаткальского хребта. Это высокогорное озеро является изюминкой более крупной территории под названием природный заповедник Сары-Челек, которая была объявлена ​​​​биосферным заповедником ЮНЕСКО в 1978 году. В заповеднике есть семь высокогорных озер, из которых озеро Сары-Челек является самым большим. Расположенное на высоте 1887 метров и образовавшееся в результате оползня озеро занимает площадь почти 500 гектаров. Глубина озера варьируется, самая глубокая точка составляет 245 метров.',
          kg: 'Сары Челек Кыргызстандын батышындагы Жалал-Абад облусунда, Чаткал тоо кыркаларынын этегинде Батыш Тянь-Шань тоолорунда жайгашкан. Бул альп көлү 1978-жылы ЮНЕСКОнун биосфералык резерваты деп жарыяланган Сары-Челек коругу деп аталган ири аймактын өзгөчөлүгү болуп саналат. Корукта жети альп көлү бар, алардын эң чоңу Сары Челек көлү. 1887 метр бийиктикте жайгашкан жана жер көчкүдөн пайда болгон көл дээрлик 500 гектар жерди ээлейт. Көлдүн тереңдиги ар кандай, эң терең жери 245 метр.',
        },
        category: ['on budget'],
        price: 8700,
        duration: 3,
        plan: [
          {
            title: {
              en: 'From Bishkek to Jalal-Abad',
              ru: 'От Бишкека до Джалал-Абада',
              kg: 'Бишкектен Джалал-Абадка чейин',
            },
            planDescription: {
              en: 'At 8.00, meet your guide and driver. Start driving to Sary Chelek (from Bishkek - 685 km 10-12 hours). Arrival in Sary Chelek (Arkyt village) in the afternoon. Dinner and overnight in a home stay.',
              ru: 'В 8.00 встреча с гидом и водителем. Начало поездки в Сары-Челек (из Бишкека – 685 км, 10-12 часов). Прибытие в Сары-Челек (село Аркыт) во второй половине дня. Ужин и ночевка в гостевом доме.',
              kg: 'Саат 8.00дө гид жана айдоочуңуз менен жолугушуңуз. Сары Челекке (Бишкектен – 685 км 10-12 саат) айдап баштаңыз. Түштөн кийин Сары Челекке (Аркыт айылы) келүү. Кечки тамак жана түнүү үйдө болуу.',
            },
          },
          {
            title: {
              en: 'Free day in Sary-Chelek',
              ru: 'От Бишкека до Джалал-Абада',
              kg: 'Бишкектен Джалал-Абадка чейин',
            },
            planDescription: {
              en: 'Free day in Sary Chelek. After breakfast transfer from Arkyt village to Sary Chelek lake (15 km, 30 minutes). Picnic for lunch. Transfer back to Arkyt village. Dinner and overnight in a home stay.',
              ru: 'Свободный день в Сары-Челеке. После завтрака трансфер из села Аркыт к озеру Сары Челек (15 км, 30 минут). Пикник на обед. Возвращение в село Аркыт. Ужин и ночевка в гостевом доме.',
              kg: 'Сары Челектеги бош күн. Эртең мененки тамактан кийин Аркыт айылынан Сары Челек көлүнө (15 км, 30 мүнөт) көчүү. Түшкү тамакка пикник. Аркыт айылына кайтуу. Кечки тамак жана түнүү үйдө болуу.',
            },
          },
          {
            title: {
              en: 'From Jalal-Abad back to Bishkek',
              ru: 'От Бишкека до Джалал-Абада',
              kg: 'Бишкектен Джалал-Абадка чейин',
            },
            planDescription: {
              en: 'After breakfast transfer back to Bishkek. End of the tour.',
              ru: 'После завтрака трансфер обратно в Бишкек. Конец тура.',
              kg: 'Эртең мененки тамактан кийин Бишкекке кайтабыз. Турдун аягы.',
            },
          },
        ],
        destination: {
          en: 'Jalal-Abad, Sary-Chelek',
          ru: 'Джалал-Абад, Сары-Челек',
          kg: 'Жалал-Абад, Сары-Челек',
        },
        arrival: {
          en: 'Akhunbaev st. 75',
          ru: 'Ахунбаева 75',
          kg: 'Ахунбаев 75',
        },
        departure: { en: '11:00 PM', ru: '11:00 PM', kg: '11:00 PM' },
        dressCode: {
          en: 'Casual. Comfortable athletic clothing, hiking shoes.',
          ru: 'Повседневный. Удобная спортивная одежда, походная обувь.',
          kg: 'Күнүмдүк. Ыңгайлуу спорттук кийимдер, сейилдөө бут кийимдери.',
        },
        included: {
          en: ['Group Guide', 'Transport', 'Guesthouse', 'Food'],
          ru: ['Группа гидов', 'Транспорт', 'Гостевой дом', 'Питание'],
          kg: ['Гиддер тобу', 'Транспорт', 'Конок үй', 'Тамактануу'],
        },
        galleryTour: ['fixtures/sary-chelek.jpeg'],
        country: { en: 'Kyrgyzstan', ru: 'Кыргызстан', kg: 'Кыргызстан' },
        isPublished: true,
        date: '26/01/2024',
        map: `<iframe src='https://www.google.com/maps/d/embed?mid=1BeIDSQaVcIhrNblCMEUy6RI4sPFEjtQ&ehbc=2E312F&noprof=1' width='640' height='480'></iframe>`,
        mapLink:
          'https://www.google.com/maps/d/edit?mid=1BeIDSQaVcIhrNblCMEUy6RI4sPFEjtQ&usp=sharing',
      },
      {
        guides: [Andrey._id, Artem._id],
        name: {
          en: 'Fascinating Ala-Kul Tour',
          ru: 'Тур по очаравательному озеру Ала-Куль',
          kg: 'Кереметтүү Ала-Көлгө саякат',
        },
        mainImage: 'fixtures/ala-kul.jpeg',
        description: {
          en: 'Ala Kul lake is located at an altitude of 3500 m, 20 kilometers south of the city of Karakol. The best time to visit Ala Kul lake is between early July and the end of September.  The trail to Ala Kul is well-marked, and you will find other hikers along during the hiking season, so you can hike to Ala Kul alone too.',
          ru: 'Озеро Ала-Куль расположено на высоте 3500 м, в 20 километрах к югу от города Каракол. Лучшее время для посещения озера Ала-Куль – с начала июля до конца сентября. Тропа к Ала-Кулю хорошо обозначена, и во время туристического сезона вы встретите других туристов, так что вы также можете отправиться в поход на Ала-Куль в одиночку.',
          kg: 'Ала-Көл көлү 3500 м бийиктикте, Каракол шаарынан 20 км түштүктө жайгашкан. Ала-Көлгө баруунун эң жакшы мезгили - июлдун башынан сентябрдын аягына чейин. Ала-Көлгө баруучу жол жакшы белгиленет жана жөө жүрүү мезгилинде сиз башка саякатчыларды таба аласыз, ошондуктан сиз Ала-Көлгө жалгыз чыгыңыз.',
        },
        category: ['history'],
        price: 3500,
        duration: 2,
        plan: [
          {
            title: {
              en: 'From Bishkek to Karakol',
              ru: 'От Бишкека до Каракола',
              kg: 'Бишкектен Караколго чейин',
            },
            planDescription: {
              en: 'In the morning you’ll be picked up from destination and go to Karakol. The trek starts from Karakol town. First, you need to get to the entrance of Karakol National Park. Then you need to walk along the old road toward the Sirota bridge for about 3 hours or 10 km. Here the difficult part of the trail begins. You need to walk through the forest up towards Ala Kul. The trail is clearly visible, you just need to follow the trail. After climbing for about + 500 m, you will arrive at the Sirota Camp. There is usually a tent camp in Sirota. You can overnight at the campsite if you don’t have a tent.',
              ru: '*Утром вас заберут из пункта назначения и отправят в Каракол. Трек начинается из города Каракол. Сначала вам нужно добраться до входа в Каракольский национальный парк. Далее нужно идти по старой дороге в сторону моста Сирота около 3 часов или 10 км. Здесь начинается трудная часть пути. Вам нужно пройти через лес в сторону Ала-Куля. Тропа хорошо видна, нужно просто идти по ней. Поднявшись примерно на +500 м, вы прибудете в лагерь Сирота. В Сироте обычно есть палаточный лагерь. Если у вас нет палатки, вы можете переночевать в кемпинге.',
              kg: 'Эртең менен бара турган жерден алып, Караколго кетесиң. Жөө жүрүш Каракол шаарынан башталат. Алгач Каракол улуттук паркынын кире беришине жетишиңиз керек. Андан кийин сиз Сирота көпүрөсүн көздөй эски жол менен 3 саат же 10 км басышыңыз керек. Бул жерден жолдун татаал бөлүгү башталат. Токойду аралап Ала-Көлдү көздөй басып өтүш керек. Из даана көрүнүп турат, жөн гана из менен жүрүш керек. Болжол менен + 500 м бийиктикке чыккандан кийин Сирота лагерине жетесиз. Сиротада көбүнчө чатыр лагери бар. Чатырыңыз жок болсо, лагерде түнө аласыз.',
            },
          },
          {
            title: {
              en: 'From Altyn Arashan to AkSuu - Karakol Town - back to Bishkek',
              ru: 'От Бишкека до Каракола',
              kg: 'Бишкектен Караколго чейин',
            },
            planDescription: {
              en: 'On the second day you will goo to Aksuu, relax there, go to Karakol and back to Bishkek.',
              ru: 'На второй день вы поедете в Аксуу, отдохнете там, поедете в Каракол и вернетесь в Бишкек.',
              kg: 'Экинчи күнү Аксууга барып, ошол жактан эс алып, Караколго барып, кайра Бишкекке кетесиң.',
            },
          },
        ],
        destination: {
          en: 'Karakol, Ala-Kul',
          ru: 'Каракол, Ала-Куль',
          kg: 'Каракол, Ала-Көл',
        },
        arrival: {
          en: 'Akhunbaev st. 75',
          ru: 'Ахунбаева 75',
          kg: 'Ахунбаев 75',
        },
        departure: { en: '11:00 PM', ru: '11:00 PM', kg: '11:00 PM' },
        dressCode: {
          en: 'Casual. Comfortable athletic clothing, hiking shoes.',
          ru: 'Повседневный. Удобная спортивная одежда, походная обувь.',
          kg: 'Күнүмдүк. Ыңгайлуу спорттук кийимдер, сейилдөө бут кийимдери.',
        },
        included: {
          en: ['Museum Tickets', 'Group Guide', 'Transport', 'Tents'],
          ru: ['Билеты в музей', 'Группа гидов', 'Транспорт', 'Палатки'],
          kg: ['Музейге билеттер', 'Гиддер тобу', 'Транспорт', 'Чатырлар'],
        },
        galleryTour: ['fixtures/ala-kul.jpeg'],
        country: { en: 'Kyrgyzstan', ru: 'Кыргызстан', kg: 'Кыргызстан' },
        isPublished: true,
        date: '27/01/2024',
        map: `<iframe src='https://www.google.com/maps/d/embed?mid=1BeIDSQaVcIhrNblCMEUy6RI4sPFEjtQ&ehbc=2E312F&noprof=1' width='640' height='480'></iframe>`,
        mapLink:
          'https://www.google.com/maps/d/edit?mid=1BeIDSQaVcIhrNblCMEUy6RI4sPFEjtQ&usp=sharing',
      },
    );

  await TourReview.create(
    {
      user: user3._id,
      tour: Burana._id,
      comment: 'Nice tour!',
      date: '2023-11-01T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: Burana._id,
      comment: 'Love this tour!',
      date: '2023-11-01T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: Canyon._id,
      comment: 'Good one! I love it!',
      date: '2024-05-17T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: IssykKul._id,
      comment: 'Very beautiful place',
      date: '2024-07-09T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: Osh._id,
      comment: 'Amazing place, but it was cold!',
      date: '2024-08-05T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: AlaKul._id,
      comment: 'Amazing place, love it',
      date: '2024-08-05T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: SaryChelek._id,
      comment: 'Very beautiful lake!!!',
      date: '2024-08-05T17:11:22.353Z',
    },
  );

  await Order.create(
    {
      user: user3._id,
      email: user3.email,
      guide: Andrey._id,
      tour: Naryn._id,
      price: Naryn.price,
      date: '2023-11-08T11:22:03.760Z',
      datetime: '2023-11-22T08:20:12.051Z',
      status: 'booked',
    },
    {
      guide: Artem._id,
      email: 'jojojojojo@gmail.com',
      tour: Osh._id,
      price: Osh.price,
      date: '2023-11-08T15:14:05.760Z',
      datetime: '2023-11-22T08:20:12.051Z',
      status: 'being considered',
      phone: '+996 707 777 404',
    },
    {
      user: user1._id,
      email: user1.email,
      guide: Andrey._id,
      tour: Naryn._id,
      price: Naryn.price,
      date: '2023-11-08T11:22:03.760Z',
      datetime: '2023-11-22T08:20:12.051Z',
      status: 'approved',
    },
    {
      guide: Artem._id,
      email: 'brzzkv@gmail.com',
      tour: Osh._id,
      price: Osh.price,
      date: '2023-11-08T15:14:05.760Z',
      datetime: '2023-11-22T08:20:12.051Z',
      status: 'being considered',
      phone: '+996 707 777 404',
    },
  );

  await News.create(
    {
      title: {
        en: '5 Amazing places in Issyk-Kul',
        ru: '5 удивительных мест на Иссык-Куле',
        kg: 'Ысык-Көлдөгү 5 укмуш жерлер',
      },
      description: {
        en: 'Located in the northeast of the country, Issyk-Kul borders with Kazakhstan on the northeast, with China on the southeast, with the Naryn region on the southwest, and with the Chuy region on the northwest. Within the borders of the Chui region, there is the famous Issyk-Kul lake that is one of the largest mountain lakes in the world which does not freeze even in the most severe winters. Issyk-Kul region is the most visited region of Kyrgyzstan where the main attraction of the region is Issyk-Kul Lake that is again one of the deepest and largest lakes in the world, located in the middle of the picturesque Tien Shan Mountains. Also in the Issyk-Kul region are the highest mountains of the country: the famous peak of Khan-Tengri and the highest point of Kyrgyzstan – the Pobeda Peak. That’s why Issyk-Kul is a pearl of Central Asia. But now it is time to find out some of the amazing places to visit in Issyk Kul. So, let get started. Here are the 5 Best Places to Visit in Issyk Kul: 1. Jeti Oguz Gorge, 2. Ak-Suu Gorge, 3. Tuz-Kol, 4. Ala-Kul Lake, 5. Sarychat-Eеrtash State Reserve',
        ru: 'Расположенный на северо-востоке страны, Иссык-Куль граничит с Казахстаном на северо-востоке, с Китаем на юго-востоке, с Нарынской областью на юго-западе и с Чуйской областью на северо-западе. В границах Чуйской области находится знаменитое озеро Иссык-Куль – одно из крупнейших горных озер мира, не замерзающее даже в самые суровые зимы. Иссык-Кульская область — самый посещаемый регион Кыргызстана, где главной достопримечательностью региона является озеро Иссык-Куль, одно из самых глубоких и больших озер в мире, расположенное посреди живописных гор Тянь-Шаня. Также в Иссык-Кульской области находятся самые высокие горы страны: знаменитая вершина Хан-Тенгри и высшая точка Кыргызстана – пик Победы. Именно поэтому Иссык-Куль – жемчужина Центральной Азии. Но теперь пришло время узнать некоторые удивительные места, которые стоит посетить на Иссык-Куле. Итак, приступим. Вот 5 лучших мест для посещения на Иссык-Куле: 1. Ущелье Джети-Огуз, 2. Ущелье Ак-Суу, 3. Туз-Куль, 4. Озеро Ала-Куль, 5. Сарычат-Эрташский государственный заповедник.',
        kg: 'Өлкөнүн түндүк-чыгышында жайгашкан Ысык-Көл түндүк-чыгышта Казакстан, түштүк-чыгышта Кытай, түштүк-батышта Нарын облусу, түндүк-батышта Чүй облусу менен чектешет. Чүй облусунун чегинде дүйнөдөгү эң чоң тоо көлдөрүнүн бири болгон атактуу Ысык-Көл бар, ал эң катаал кышында да тоңбойт. Ысык-Көл облусу Кыргызстандын эң көп туристтерди тартуучу аймагы болуп саналат, анда аймактын негизги кооз жери – бул дүйнөдөгү эң терең жана эң чоң көлдөрдүн бири, кооз Тянь-Шань тоолорунун ортосунда жайгашкан Ысык-Көл. Ошондой эле Ысык-Көл облусунда өлкөнүн эң бийик тоолору: белгилүү Хан-Теңир чокусу жана Кыргызстандын эң бийик жери – Победа чокусу жайгашкан. Ошон үчүн Ысык-Көл Борбордук Азиянын бермети. Бирок азыр Ысык-Көлдүн укмуштуудай жерлерин табууга убакыт жетти. Ошентип, баштайлы. Бул жерде Ысык-Көлдөгү эң мыкты 5 жер: 1. Жети-Өгүз капчыгайы, 2. Ак-Суу капчыгайы, 3. Туз-Кол, 4. Ала-Көл, 5. Сарычат-Ээрташ мамлекеттик коругу',
      },
      date: '2023-11-08T11:22:03.760Z',
      category: ['places'],
      images: ['fixtures/issyk-kul.jpeg'],
      isPublished: true,
    },
    {
      title: {
        en: 'Riding Horses in Ala-Archa: Personal Experience',
        ru: 'Верховая езда в Ала-Арче',
        kg: 'Ала-Арчада ат минүү',
      },
      description: {
        en: 'The horse is a national symbol of Kyrgyzstan and the animal is intrinsic to the country’s heritage. For thousands of years, the horse has bolstered life for Kyrgyz people and continues to do so. A known saying of the country is “every Kyrgyz man’s wings are his horse” and it’s said that Central Asians hunter-gatherers were the first to ride horses. These calm creatures have played a pivotal role in Kyrgyz agriculture, economy, defense and traditions. Even fermented horse milk is cherished – Westerners, make sure your stomach is as strong as steel before you dazzle your tastebuds… Kyrgyz people are expert horsemen and their national games champion their equestrian skills, such as Dead Goat Polo. Kyrgyzstan has a myriad of peaks, streams and prairie plains. Each region has its own throng of striking landscapes for you to delve into. Whenever I close my eyes and think of Kyrgyzstan, I’m transported to the image of a shepherd galloping across the plains with such care-free and vivacious spirit.',
        ru: 'Лошадь является национальным символом Кыргызстана и является неотъемлемой частью наследия страны. На протяжении тысячелетий лошадь поддерживала жизнь кыргызов и продолжает это делать. Известная поговорка в стране гласит: «Крылья каждого кыргыза – его лошадь», и говорят, что охотники-собиратели из Центральной Азии были первыми, кто начал ездить на лошадях. Эти спокойные существа сыграли ключевую роль в сельском хозяйстве, экономике, обороне и традициях Кыргызской Республики. Ценят даже ферментированное лошадиное молоко – жители Запада, прежде чем поразить вкусовые рецепторы, убедитесь, что ваш желудок крепок, как сталь… Кыргызы – искусные наездники, и их национальные игры развивают их навыки верховой езды, такие как поло с мертвым козлом. Кыргызстан имеет множество вершин, ручьев и прерийных равнин. В каждом регионе есть множество поразительных пейзажей, в которые вам стоит погрузиться. Всякий раз, когда я закрываю глаза и думаю о Кыргызстане, я вспоминаю образ пастуха, скачущего по равнине с таким беззаботным и жизнерадостным духом.',
        kg: 'Жылкы Кыргызстандын улуттук символу, ал эми жаныбар өлкөнүн мурасы болуп саналат. Миңдеген жылдар бою жылкы кыргыздар үчүн тиричиликти бекемдеп келген жана улантууда. “Ар бир кыргыздын канаты – жылкысы” деген эл оозунда айтылып жүргөн кеп, Орто Азиянын мергенчилери атка биринчилерден болуп мингени айтылат. Бул бейпил жандыктар Кыргызстандын айыл чарбасында, экономикасында, коргонуусунда жана салт-санаасында чечүүчү роль ойногон. Жылкынын ачытылган сүтүн да баалашат – батыштыктар, даамыңды таң калтырардан мурун, курсагыңдын болоттой бекем болушун текшерип көр... Кыргыздар чабандестер жана улуттук оюндарында Өлгөн теке поло сыяктуу ат оюндарын даңазалайт. Кыргызстанда сансыз чокулар, суулар жана талаа түздүктөрү бар. Ар бир региондо сиз изилдей турган укмуштуудай пейзаждар бар. Көзүмдү жумуп, Кыргызстанды эстеген сайын, мени ушунчалык бейкапар жана сергек рух менен түздүктө чабып бара жаткан чабандын элеси келет.',
      },
      date: '2023-11-08T11:22:03.760Z',
      category: ['animals'],
      images: ['fixtures/ala-archa.jpeg'],
      isPublished: true,
    },
    {
      title: {
        en: 'How to get from Almaty to Bishkek by public transport in 2023: best way to cross the Kazakhstan – Kyrgyzstan border',
        ru: 'Как добраться из Алматы в Бишкек на общественном транспорте в 2023 году: как лучше пересечь границу Казахстана и Кыргызстана',
        kg: '2023-жылы Алматыдан Бишкекке коомдук транспорт менен кантип жетсе болот: Казакстан-Кыргызстан чек арасынан өтүүнүн эң жакшы жолу',
      },
      description: {
        en: 'To take the bus from Almaty to Bishkek, you’ll have to go to the Sayran Bus Station in Almaty. This bus station is located 7km west of the city center so you’ll first have to take a city bus or a taxi to get there. There are daily 5 buses from Almaty to Bishkek, at 8:00, 10:00, 12:00, 14:00, and 18:00. One ticket costs 2500 KZT during weekdays and 2700 KZT on weekends. Once you arrive at the bus station, go inside the building and ask for the bus to Bishkek. People will show you the little office where you can purchase your ticket. Once you’ve got your ticket, go through the first door near the office and turn right. The bus to Bishkek is on platform 1, the very last one on your right-hand side. The ride to the border takes about 4 hours. The driver always takes a 10-minute break halfway through the journey at “Cafe Eurasia” where you can go to the toilet (50KZT or 5 KGS) and buy some snacks. There are several borders between Kazakhstan and Kyrgyzstan. When you take the bus from Almaty to Bishkek, you’ll cross at the Korday border, which is located about 21 km from the city center of Bishkek. Once you arrive at the border, you’ll have to get off the bus and take all your luggage with you. Take note of the license plate number so you can easily find your bus back on the Kyrgyz side of the border. The time it will take you to go through the border depends on how many people there are. If there are a lot of people, you’ll see long and disorganized queues and you might experience a lot of pushing and shoving.',
        ru: 'Чтобы сесть на автобус из Алматы в Бишкек, вам придется доехать до автовокзала Сайран в Алматы. Этот автовокзал расположен в 7 км к западу от центра города, поэтому вам сначала придется сесть на городской автобус или такси, чтобы добраться туда. Из Алматы в Бишкек ежедневно ходят 5 автобусов в 8:00, 10:00, 12:00, 14:00 и 18:00. Один билет стоит 2500 тенге в будние дни и 2700 тенге в выходные. Прибыв на автовокзал, зайдите в здание и попросите автобус до Бишкека. Люди покажут вам небольшой офис, где можно купить билет. Получив билет, пройдите через первую дверь рядом с офисом и поверните направо. Автобус до Бишкека стоит на платформе 1, самой последней справа от вас. Дорога до границы занимает около 4 часов. В середине пути водитель всегда делает 10-минутный перерыв в «Кафе Евразия», где можно сходить в туалет (50 тенге или 5 сомов) и купить перекус. Между Казахстаном и Кыргызстаном существует несколько границ. Когда вы сядете на автобус из Алматы в Бишкек, вы пересечете границу Кордай, которая находится примерно в 21 км от центра Бишкека. По прибытии на границу вам придется выйти из автобуса и взять с собой весь багаж. Запишите номерной знак, чтобы вы могли легко найти свой автобус на киргизской стороне границы. Время, которое вам понадобится, чтобы пройти границу, зависит от количества людей. Если людей много, вы увидите длинные и неорганизованные очереди и можете столкнуться с толчками и толчками.',
        kg: 'Алматыдан Бишкекке автобуска түшүү үчүн Алматыдагы Сайран автовокзалына барышыңыз керек. Бул автобекет шаардын борборунан 7 км батыш тарапта жайгашкан, андыктан ал жакка жетүү үчүн алгач шаардык автобуска же таксиге түшүшүңүз керек. Алматыдан Бишкекке күн сайын 5 автобус каттайт, саат 8:00, 10:00, 12:00, 14:00, 18:00. Бир билет иш күндөрү 2500 тенге, дем алыш күндөрү 2700 тенге турат. Автобекетке келгенден кийин имараттын ичине кирип, Бишкекке автобус сура. Адамдар сизге билет сатып ала турган кичинекей кеңсени көрсөтөт. Билетиңизди алгандан кийин кеңсенин жанындагы биринчи эшиктен өтүп, оңго буруңуз. Бишкекке бараткан автобус 1-платформада, эң акыркысы оң тарабыңызда. Чек арага чейин 4 саатка жакын жол жүрөт. Айдоочу ар дайым жолдун жарымында 10 мүнөттүк тыныгуу алат "Кафе Евразияда" сиз дааратканага (50 тг же 5 сом) барып, закускаларды сатып ала аласыз. Казакстан менен Кыргызстандын ортосунда бир нече чек ара бар. Алматыдан Бишкекке автобуска отуруп, Бишкектин борборунан 21 км алыстыкта жайгашкан Кордай чек арасынан өтөсүз. Чек арага келгенден кийин автобустан түшүп, бардык жүгүңдү өзүң менен алып барышың керек. Автобусуңузду чек аранын кыргыз тарабында оңой таап алышыңыз үчүн мамлекеттик номерге көңүл буруңуз. Чек арадан өтүүгө канча убакыт кетет, канча адам бар экенине жараша болот. Эгерде адамдар көп болсо, сиз узун жана уюшулган эмес кезектерди көрөсүз жана көп түртүп, түртүп башташыңыз мүмкүн.',
      },
      date: '2023-11-08T11:22:03.760Z',
      category: ['borders'],
      images: ['fixtures/korday.jpeg'],
      isPublished: true,
    },
    {
      title: {
        en: '3 beautiful lakes in Kyrgyzstan',
        ru: '3 красивых озера Кыргызстана',
        kg: 'Кыргызстандагы 3 кооз көл',
      },
      description: {
        en: 'Over 1900 alpine lakes rest within Kyrgyzstan’s stunning mountain peaks, like hidden gemstones scattered throughout the country. The diverse Kyrgyzstan landscape makes every lake unique, with varying elevation, size, surrounding terrain and weather.It would be difficult to write about each and every one as some are so tiny that they wouldn’t even show on a map. So here is selected 3 of the most beautiful and best lakes in Kyrgyzstan that will help give you detailed info about each, facts and Kygyz myths and legends connected to these Kyrgyzstan lakes. 3 stunning lakes in Kyrgyzstan: Kel-Suu (Kel Suu, also known as Kol Tetiri, translates to ‘coming water’ in Kyrgyz and relates to the fact that sometimes the water in the lake comes and goes, leaking into connected caves. This fascinating feature creates a somewhat magical and mysterious atmosphere and helps make this one of the most beautiful Kyrgyzstan lakes.),  Song-Kol lak (Lake Son-Kul or Song-Köl’s name translates to ‘‘following lake’. Situated in the northern Naryn Province, this is Kyrgyzstan’s second-largest alpine lake and the country’s largest freshwater lake.), Kol-Ukok lake (The caravans of the Silk Road once passed here whilst traveling through the Torugart pass to Chinese Kashgar. Kol-Ukok in Kyrgyz translates to ‘lake in a chest’ and is located in the Naryn region in the North-Eastern Terskey Ala-Too mountain range.).',
        ru: "Более 1900 альпийских озер расположены на потрясающих горных вершинах Кыргызстана, словно скрытые драгоценные камни, разбросанные по всей стране. Разнообразный ландшафт Кыргызстана делает каждое озеро уникальным: с разной высотой, размером, окружающим ландшафтом и погодой. Было бы сложно написать о каждом из них, поскольку некоторые из них настолько крошечные, что их даже невозможно отобразить на карте. Итак, здесь выбраны 3 самых красивых и лучших озера Кыргызстана, которые помогут вам получить подробную информацию о каждом, а также факты, а также кыргызские мифы и легенды, связанные с этими озерами Кыргызстана. 3 потрясающих озера в Кыргызстане: Кель-Суу (Кель-Суу, также известный как Кол Тетири, на кыргызском языке переводится как «приходящая вода» и связано с тем фактом, что иногда вода в озере приходит и уходит, просачиваясь в соединенные между собой пещеры. Это увлекательное зрелище особенность создает несколько волшебную и загадочную атмосферу и помогает сделать это озеро одним из самых красивых озер Кыргызстана.), Сон-Куль лак (озеро Сон-Куль или название Сон-Кёля переводится как «следующее озеро». Расположено в северной Нарынской области). , это второе по величине высокогорное озеро Кыргызстана и самое большое пресноводное озеро страны.), озеро Кол-Укок (Караваны Шелкового пути когда-то проходили здесь, путешествуя через перевал Торугарт в китайский Кашгар. Кол-Укок на кыргызском языке переводится как ' озеро в сундуке» и расположен в Нарынской области в северо-восточном хребте Терскей Ала-Тоо.).",
        kg: '1900дөн ашуун альп көлдөрү Кыргызстандын укмуштуудай тоо чокуларында жайгашкан, алар бүт өлкө боюнча чачылган жашыруун асыл таштар сыяктуу. Кыргызстандын ар түрдүү ландшафттары ар бир көлдү уникалдуу кылат, анын бийиктиги, өлчөмү, курчап турган рельефи жана аба ырайы ар түрдүү. Алардын ар бири жөнүндө жазуу кыйынга турат, анткени кээ бирлери өтө кичинекей болгондуктан, алар картада да көрүнбөйт. Ошентип, бул жерде Кыргызстандын эң кооз жана эң мыкты 3 көлү тандалды, алар ар бири, фактылары жана Кыргызстандын бул көлдөрү менен байланышкан кыргыз мифтери жана уламыштары жөнүндө толук маалымат берүүгө жардам берет. Кыргызстандагы 3 кереметтүү көл: Кел-Суу (Кел Суу, ошондой эле Көл Тетири деген ат менен белгилүү, кыргызча «келүүчү суу» деп которулат жана кээде көлдөгү суу келип-кетип, бири-бирине туташкан үңкүрлөргө агып кетээрин билдирет. өзгөчөлүгү бир аз сыйкырдуу жана сырдуу атмосфераны жаратат жана аны Кыргызстандын эң кооз көлдөрүнүн бирине айлантууга жардам берет.), Соң-Көл көлү (Соң-Көл көлү же Соң-Көлдүн аталышы "арткы көл" деп которулат. Нарын облусунун түндүгүндө жайгашкан. , бул Кыргызстандын экинчи чоң альп көлү жана өлкөнүн эң чоң тузсуз көлү.), Көл-Үкөк көлү (Жибек Жолунун кербендери Торугарт ашуусу аркылуу Кытайдын Кашкарына бара жатып бул жерден өткөн. Көл-Үкөк кыргызча котормосу " көкүрөктөгү көл\' жана Нарын облусунда Түндүк-Чыгыш Тескей Ала-Тоо кыркаларында жайгашкан.).',
      },
      date: '2023-11-08T11:22:03.760Z',
      category: ['places'],
      images: [
        'fixtures/kel-suu.jpeg',
        'fixtures/son-kul.jpeg',
        'fixtures/kol-ukok.jpeg',
      ],
      isPublished: true,
    },
    {
      title: {
        en: 'The best things to do in Kyrgyzstan',
        ru: 'Лучшие развлечения в Кыргызстане',
        kg: 'Кыргызстанда кыла турган эң жакшы нерселер',
      },
      description: {
        en: 'Kyrgyzstan is wonderful place! Here are some best things to do in Kyrgyzstan. Staying in a yurt camp is one of the best and most unique things to do in Kyrgyzstan when you want to learn more about the Central Asian nomadic culture. Kyrgyzstan has the most accessible nomadic culture in Central Asia. Nowadays many Kyrgyz people live a semi-nomadic way of life. During the period between early June and late September, you’ll find many yurt camps all around the country. The art of felt-making has always played an important role in the lives of the Kyrgyz people. The secrets of this handicraft were handed down from generation to generation. The felt, made from lamb wool, was primarily used to cover and decorate the yurts but this material was also used to make carpets, bags, toys, and clothes.',
        ru: 'Кыргызстан – чудесное место! Вот несколько лучших занятий в Кыргызстане. Пребывание в юрточном лагере — одно из лучших и самых уникальных занятий в Кыргызстане, если вы хотите больше узнать о культуре кочевников Центральной Азии. Кыргызстан имеет самую доступную кочевую культуру в Центральной Азии. В настоящее время многие кыргызы ведут полукочевой образ жизни. В период с начала июня до конца сентября по всей стране вы найдете множество юрточных лагерей. Искусство изготовления войлока всегда играло важную роль в жизни кыргызского народа. Секреты этого ремесла передавались из поколения в поколение. Войлок из овечьей шерсти в основном использовался для покрытия и украшения юрт, но из этого материала также шили ковры, сумки, игрушки и одежду.',
        kg: 'Кыргызстан керемет жер! Бул жерде Кыргызстанда жасала турган эң жакшы нерселер бар. Борбордук Азиянын көчмөндөрүнүн маданияты жөнүндө көбүрөөк билгиңиз келсе, Кыргызстанда жасала турган эң жакшы жана өзгөчө нерселердин бири боз үй лагеринде болуу. Кыргызстан Борбордук Азиядагы эң жеткиликтүү көчмөн маданиятына ээ. Бүгүнкү күндө көптөгөн кыргыздар жарым көчмөн турмушта жашашат. Июнь айынын башынан сентябрдын аягына чейинки мезгилде өлкөнүн бардык аймактарында көптөгөн боз үй лагерлерин таба аласыз. Кийиз жасоо өнөрү кыргыз элинин турмушунда дайыма чоң роль ойноп келген. Бул кол өнөрчүлүктүн сырлары муундан муунга өтүп келген. Койдун жүнүнөн жасалган кийиз негизинен боз үйлөрдү жабуу жана жасалгалоо үчүн колдонулган, бирок бул материалдан килем, баштык, оюнчук, кийим-кече жасалган.',
      },
      date: '2023-11-08T11:22:03.760Z',
      category: ['places'],
      images: ['fixtures/yurt.jpeg'],
      isPublished: true,
    },
    {
      title: {
        en: 'What to wear hiking in Kyrgyzstan?',
        ru: 'Что надеть в поход по Кыргызстану?',
        kg: 'Кыргызстанда саякатка эмне кийиш керек?',
      },
      description: {
        en: 'Here’s the complete packing list for Kyrgyzstan (which can also be applied when traveling to Tajikistan and Kazakhstan. I also included some very important tips and advice that you need to take into consideration before you go trekking in the Central Asian mountains. When you go hiking for a few days in the remote Central Asian mountains, it’s crucial that you have the right trekking gear with you and that you pack wisely. To make sure you’re prepared and you don’t forget anything, I created a list of everything you need to pack and do when you’re planning on trekking in Central Asia. When it comes to packing for a trek, keep it as light as possible. Remember that you have to carry everything yourself and if you have ever done a 20 km hike that included climbing and ascending steep hills, you’ll know that there’s a big difference between carrying 10kg and hiking with 15kg on your back! The list: GPS, FISRT-AID KIT, SUNSCREEN, TENT, SLEEPING BAG, SPORT SHOES!',
        ru: 'Вот полный список вещей для Кыргызстана (который также можно использовать при поездке в Таджикистан и Казахстан. Я также включил несколько очень важных советов и рекомендаций, которые вам необходимо принять во внимание, прежде чем отправиться в поход в горы Центральной Азии. Когда вы отправляетесь в поход Чтобы провести несколько дней в отдаленных горах Центральной Азии, очень важно иметь с собой подходящее треккинговое снаряжение и тщательно собрать вещи. Чтобы убедиться, что вы готовы и ничего не забудете, я составил список всего, что вам нужно нужно собирать вещи и делать, когда вы планируете поход по Центральной Азии. Когда дело доходит до похода, держите его как можно более легким. Помните, что вам придется нести все самостоятельно, и если вы когда-либо совершали 20-километровый поход включая восхождение и восхождение на крутые холмы, вы поймете, что есть большая разница между переноской 10 кг и походом с 15 кг на спине!Список: GPS, АПТЕЧКА, СОЛНЦЕЗАЩИТНЫЙ КРЕМ, ПАЛАТКА, СПАЛЬНЫЙ МЕШОК, СПОРТИВНАЯ ОБУВЬ!',
        kg: 'Бул жерде Кыргызстан үчүн таңгактардын толук тизмеси (бул Тажикстан менен Казакстанга саякаттоодо да колдонулушу мүмкүн. Мен ошондой эле Борбордук Азиянын тоолорунда треккингге барардан мурун эске алышыңыз керек болгон абдан маанилүү кеңештерди жана кеңештерди киргиздим. Төө саякатка чыкканда Орто Азиянын алыскы тоолорунда бир нече күн жүрсөңүз, жаныңызда туура треккинг шайманыңыз болушу жана таңгактарды кылдаттык менен жыйыңыз абдан маанилүү. Даяр болгонуңузду жана эч нерсени унутпашыңыз үчүн, мен сиз каалаган нерселердин тизмесин түздүм. Борбор Азияда треккингге чыгууну пландаштырып жатканыңызда жүктү жыйышыңыз жана эмне кылууңуз керек. Жөө жүрүшкө бара турган болсоңуз, аны мүмкүн болушунча жеңил кармаңыз. Баардык нерсени өзүңүз көтөрүшүңүз керек экенин унутпаңыз жана 20 км жөө басып жүргөн болсоңуз. 10 кг көтөрүү менен 15 кг белиңизде жөө басуунун ортосунда чоң айырма бар экенин билесиз!',
      },
      date: '2023-11-08T11:22:03.760Z',
      category: ['clothes'],
      images: ['fixtures/hiking.jpeg'],
      isPublished: true,
    },
    {
      title: {
        en: 'Reasons why you should visit Kyrgyzstan?',
        ru: 'Причины, по которым вам следует посетить Кыргызстан',
        kg: 'Кыргызстанга эмне үчүн барышыңыз керек?',
      },
      description: {
        en: 'Kyrgyzstan is a country that captured our imagination from the very first time we entered its border from Kazakhstan. It has beautiful unspoiled mountains, crystal-clear mountain lakes,  a fascinating culture, and interesting traditions. We were amazed to see so many horses everywhere and that nomads are still living in yurts during the summer to follow the grazing of their cattle. Life in the countryside of Kyrgyzstan seemed so simple and quiet and this is something that immediately charmed us. When we first arrived in Kyrgyzstan, we still had the plan to hitchhike and sail around the whole world and we didn’t have the intention to stay in the country for very long. We had traveled all the way there on an overland journey from Europe and our goal was to reach South-East Asia as quickly as possible. After only three days in Kyrgyzstan, we decided we would be staying there for a while. What was just supposed to be a few months at first eventually became a whole year in this Central-Asian country. Now looking back, I’m so glad we took the decision to live and travel there for a longer time. There is an endless amount of things to do and plenty of beautiful places to discover in Kyrgyzstan. It’s a country where you can learn how to build yurts, walk around a fairy tale canyon and witness the perfect skills of eagle hunters. It’s also a very cheap destination and you can easily cross the border into Kazakhstan to renew your Kyrgyz visa. The nature of Kyrgyzstan has a wild untouched beauty that is rarely found anywhere else around the world. Reminiscing now this country where Cynthia and I lived and traveled for a year, it’s hard not to feel a certain nostalgia. I decided to write down the top reasons that made Kyrgyzstan so special to us and hopefully, this list will inspire you to visit the country one day as well.',
        ru: 'Кыргызстан — страна, которая захватила наше воображение с самого первого момента, когда мы пересекли ее границу с Казахстаном. Здесь красивые нетронутые горы, кристально чистые горные озера, увлекательная культура и интересные традиции. Мы были поражены, увидев повсюду столько лошадей и что кочевники все еще летом живут в юртах, чтобы следить за выпасом своего скота. Жизнь в сельской местности Кыргызстана казалась такой простой и тихой, и это сразу нас очаровало. Когда мы впервые приехали в Кыргызстан, у нас еще были планы путешествовать автостопом и путешествовать по всему миру, и у нас не было намерения оставаться в стране надолго. Мы проделали весь этот путь по суше из Европы, и нашей целью было как можно быстрее добраться до Юго-Восточной Азии. Пробыв всего три дня в Кыргызстане, мы решили, что останемся там на некоторое время. То, что поначалу должно было длиться всего несколько месяцев, в этой центральноазиатской стране превратилось в целый год. Теперь, оглядываясь назад, я так рад, что мы приняли решение жить и путешествовать там подольше. В Кыргызстане есть бесконечное количество развлечений и множество красивых мест, которые можно открыть для себя. Это страна, где вы можете научиться строить юрты, прогуляться по сказочному каньону и стать свидетелем совершенства навыков охотников на орлов. Это также очень дешевое направление, и вы можете легко пересечь границу с Казахстаном, чтобы продлить свою кыргызскую визу. Природа Кыргызстана обладает дикой нетронутой красотой, которую редко встретишь где-либо еще в мире. Вспоминая сейчас эту страну, где мы с Синтией жили и путешествовали целый год, трудно не почувствовать определенную ностальгию. Я решил записать основные причины, которые сделали Кыргызстан таким особенным для нас, и, надеюсь, этот список вдохновит вас однажды посетить эту страну.',
        kg: 'Кыргызстан Казакстандан чек арасына биринчи киргенден баштап эле биздин элестеттирип алган өлкө. Анын бузулбаган кооз тоолор, тунук тоо көлдөрү, кызыктуу маданияты жана кызыктуу салттары бар. Ар жерде мынчалык көп жылкыларды көрүп, көчмөндөрдүн жайкысын боз үйлөрдө жашап, малын ээрчип жүргөнүнө таң калдык. Кыргызстандын элет жеринде жашоо ушунчалык жөнөкөй жана тынч көрүндү жана бул бизди дароо эле таң калтырды. Кыргызстанга жаңы келгенде бизде автостоп менен бүткүл дүйнөнү кыдырып чыгуу планыбыз бар болчу жана өлкөдө көпкө калуу ниетибиз жок болчу. Биз Европадан кургактыктагы жол менен ал жакка чейин бардык жана биздин максат Түштүк-Чыгыш Азияга мүмкүн болушунча тезирээк жетүү болчу. Кыргызстанда үч гана күн болгондон кийин, биз ал жакта бир аз убакытка калууну чечтик. Башында бир нече ай деп эсептелген бул Борбор Азия мамлекетинде акыры бир жылга айланды. Азыр артка кылчайып, мен ал жерде узак убакытка жашоо жана саякат кылуу чечимин кабыл алганыбызга абдан кубанычтамын. Кыргызстанда жасала турган чексиз көп нерселер жана көптөгөн кооз жерлер бар. Бул жерде боз үй тигүүнү үйрөнүп, жомок капчыгайында сейилдеп, бүркүтчүлөрдүн мыкты чеберчилигине күбө боло аласыз. Бул ошондой эле өтө арзан багыт жана Кыргызстандын визасын жаңыртуу үчүн Казакстандын чек арасынан оңой эле өтүп кете аласыз. Кыргызстандын жаратылышы дүйнөнүн эч бир жеринде чанда кездешпеген жапайы кооздукка ээ. Синтия экөөбүз бир жыл жашап, саякаттап жүргөн бул өлкөнү азыр эстесек, кандайдыр бир ностальгияны сезбей коюу кыйын. Мен Кыргызстанды биз үчүн өзгөчө кылган негизги себептерди жазууну чечтим жана бул тизме сизди да бир күнү өлкөгө барууга шыктандырат деп ишенем.',
      },
      date: '2023-11-08T11:22:03.760Z',
      category: ['places'],
      images: ['fixtures/reasons.jpeg'],
      isPublished: false,
    },
  );

  await Employee.create(
    {
      name: 'Sarah',
      number: '+996 708 67 76 55',
      role: 'moderator',
      image: 'fixtures/employee-1.jpeg',
    },
    {
      name: 'Pamela',
      number: '+996 708 67 76 55',
      role: 'moderator',
      image: 'fixtures/employee-2.jpeg',
    },
    {
      name: 'Jessica',
      number: '996 708 67 76 55',
      role: 'moderator',
      image: 'fixtures/employee-3.jpeg',
    },
  );

  await GuideReview.create(
    {
      user: user3._id,
      guide: Askar._id,
      comment: 'Good guide!',
      date: '2024-08-05T17:11:22.353Z',
    },
    {
      user: user3._id,
      guide: Andrey._id,
      comment: 'Pretty nice guide!',
      date: '2023-11-01T17:11:22.353Z',
    },
    {
      user: user3._id,
      guide: Artem._id,
      comment: 'Nice guide!',
      date: '2023-11-01T17:11:22.353Z',
    },
  );

  await PlatformReview.create(
    {
      user: user1._id,
      comment: 'Comfortable site!',
      date: '2024-08-05T17:11:22.353Z',
    },
    {
      user: user2._id,
      comment: 'Pretty nice tour for me!',
      date: '2023-11-01T17:11:22.353Z',
    },
    {
      user: user3._id,
      comment: 'Nice!',
      date: '2023-11-01T17:11:22.353Z',
    },
  );

  await TourRating.create(
    {
      user: user3._id,
      tour: Burana._id,
      rating: 5,
      date: '2023-11-01T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: Burana._id,
      rating: 4,
      date: '2023-11-01T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: Canyon._id,
      rating: 4,
      date: '2023-11-01T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: Osh._id,
      rating: 4,
      date: '2023-11-01T17:11:22.353Z',
    },
    {
      user: user3._id,
      tour: Osh._id,
      rating: 3,
      date: '2023-11-01T17:11:22.353Z',
    },
  );

  await GuideRating.create(
    {
      user: user3._id,
      guide: Askar._id,
      rating: 5,
      date: '2024-08-05T17:11:22.353Z',
    },
    {
      user: user3._id,
      guide: Andrey._id,
      rating: 5,
      date: '2024-08-05T17:11:22.353Z',
    },
    {
      user: user3._id,
      guide: Artem._id,
      rating: 4,
      date: '2024-08-05T17:11:22.353Z',
    },
  );

  await Partner.create(
    {
      image: 'fixtures/min-tour-logo.png',
      link: 'https://tourism.gov.kg/',
    },
    {
      name: 'Partner 2',
      link: 'https://mkk.gov.kg/%D0%B4%D0%B5%D0%BF%D0%B0%D1%80%D1%82%D0%B0%D0%BC%D0%B5%D0%BD%D1%82-%D1%82%D1%83%D1%80%D0%B8%D0%B7%D0%BC%D0%B0/29/',
    },
    {
      name: 'Partner 3',
      link: 'https://mkk.gov.kg/%D0%B4%D0%B5%D0%BF%D0%B0%D1%80%D1%82%D0%B0%D0%BC%D0%B5%D0%BD%D1%82-%D1%82%D1%83%D1%80%D0%B8%D0%B7%D0%BC%D0%B0/29/',
    },
    {
      name: 'Partner 4',
      link: 'https://mkk.gov.kg/%D0%B4%D0%B5%D0%BF%D0%B0%D1%80%D1%82%D0%B0%D0%BC%D0%B5%D0%BD%D1%82-%D1%82%D1%83%D1%80%D0%B8%D0%B7%D0%BC%D0%B0/29/',
    },
  );

  await MainSlider.create(
    {
      country: {
        en: 'Kyrgyzstan',
        ru: 'Кыргызстан',
        kg: 'Кыргызстан',
      },
      image: 'fixtures/kyrgyzstan.jpeg',
    },
    {
      country: {
        en: 'Kazakhstan',
        ru: 'Казахстан',
        kg: 'Казахстан',
      },
      image: 'fixtures/kazakhstan.jpeg',
    },
    {
      country: {
        en: 'Uzbekistan',
        ru: 'Узбекистан',
        kg: 'Узбекистан',
      },
      image: 'fixtures/uzbekistan.jpeg',
    },
  );

  await ContactUs.create({
    image: 'fixtures/contacts.jpeg',
    title: {
      en: 'Contact Us!',
      ru: 'Свяжитесь с нами!',
      kg: 'Биз менен байланышыңыз!',
    },
    description: {
      en: 'Our travel agency is a team of professionals who have a passion for travel and are ready to share this passion with you. We strive to create unforgettable experiences and make your holiday truly unique.',
      ru: 'Наше туристическое агентство — это команда профессионалов, которые страстно любят путешествия и готовы поделиться этой страстью с вами. Мы стремимся создать незабываемые впечатления и сделать ваш отдых по-настоящему уникальным.',
      kg: 'Биздин туристтик агенттик - бул саякатка ышкысы бар жана бул кумарды сиз менен бөлүшүүгө даяр адистердин командасы. Биз унутулгус окуяларды жаратууга жана сиздин майрамыңызды чындап уникалдуу кылууга аракет кылабыз.',
    },
    contact: [
      {
        country: {
          en: 'United States',
          ru: 'США',
          kg: 'АКШ',
        },
        address: {
          en: '9 Valley St. Brooklyn, NY 11203',
          ru: '9 Valley St. Бруклин, Нью-Йорк 11203',
          kg: '9 Valley St. Бруклин, Нью-Йорк 11203',
        },
        phone: '1-800-346-6277',
        _id: randomUUID(),
      },
      {
        country: {
          en: 'Canada',
          ru: 'Канада',
          kg: 'Канада',
        },
        address: {
          en: '500 Kingston Rd Toronto ON M4L 1V3',
          ru: '500 Kingston Rd Торонто ON M4L 1V3',
          kg: '500 Kingston Rd Торонто ON M4L 1V3',
        },
        phone: '1-800-346-6277',
        _id: randomUUID(),
      },
      {
        country: {
          en: 'Australia',
          ru: 'Австралия',
          kg: 'Австралия',
        },
        address: {
          en: '60 Marcus Clarke St, Canberra, ACT 2601',
          ru: 'ул. Маркуса Кларка, 60, Канберра, ACT 2601',
          kg: 'ул. Маркуса Кларка, 60, Канберра, ACT 2601',
        },
        phone: '1-800-346-6277',
        _id: randomUUID(),
      },
    ],
  });

  await AboutUs.create({
    main: {
      title: {
        en: 'About',
        ru: 'О нас',
        kg: 'Биз жөнүндө',
      },
      description: {
        en: 'We are a dedicated team committed to providing the best tour experiences in Kyrgyzstan.',
        ru: 'Мы преданный коллектив, стремящийся предоставить лучшие туристические маршруты в Кыргызстане.',
        kg: 'Биз Кыргызстандагы эң жакшы турдук маршруттарды үйрөтүүгө арзымалуу жаткан команда.',
      },
      image: 'fixtures/about-us-bg.jpg',
    },
    offer: {
      title: {
        en: 'Discover the Beauty of Kyrgyzstan with Our Tours',
        ru: 'Откройте для себя красоту Кыргызстана с нашими турами',
        kg: 'Биздин турлар менен Кыргызстандын сүйүүсүн ашыңыз',
      },
      description: {
        en: 'We offer a wide range of tours, each designed to provide you with a unique and memorable experience.',
        ru: 'Мы предлагаем широкий выбор туров, каждый из которых разработан для предоставления вам уникального и незабываемого опыта.',
        kg: 'Биз көп түрдөгү турларды үйрөтөбүз, ар бири сизге айрымалуу жана эстелүү тажрыйбаны берүү үчүн иштеп чыгарылган.',
      },
      image: 'fixtures/horses.png',
    },
    posts: [
      {
        title: {
          en: 'Save Money',
          ru: 'Экономьте деньги',
          kg: 'Акчаны үнөмдөңүз',
        },
        description: {
          en: 'Our tours are competitively priced to give you the best value for your money.',
          ru: 'Наши туры имеют конкурентоспособные цены, чтобы предоставить вам лучшее соотношение цены и качества.',
          kg: 'Биздин турлардын баасы сынайыштыруу үчүн, акчаңызды эң пайдалуу колдонуу үчүн.',
        },
        image: 'fixtures/money-icon.svg',
      },
      {
        title: {
          en: 'Get Support',
          ru: 'Наша поддержка',
          kg: 'Биздин жардам',
        },
        description: {
          en: 'Our team is always ready to assist you throughout your journey.',
          ru: 'Наша команда всегда готова помочь вам на протяжении всего вашего путешествия.',
          kg: 'Биздин команда сиздин жолуңуздун бардык убактысында жардам берүүгө даяр.',
        },
        image: 'fixtures/support-icon.svg',
      },
      {
        title: {
          en: 'Travel Safety',
          ru: 'Безопасность',
          kg: 'Коопсуздук',
        },
        description: {
          en: 'Your safety is our top priority. We ensure all our tours are safe and secure.',
          ru: 'Ваша безопасность - наш главный приоритет. Мы гарантируем, что все наши туры безопасны и надежны.',
          kg: 'Сиздин коопсуздугуңуз биздин башкыча максатыбыз. Биз бардык турларыбыздын коопсуз жана ишенчтүү экенин камтыйбыз.',
        },
        image: 'fixtures/safety-icon.svg',
      },
      {
        title: {
          en: 'Book Easily',
          ru: 'Бронируйте легко',
          kg: 'Оңой ээлөө',
        },
        description: {
          en: 'Our booking process is simple and straightforward, making it easy for you to plan your next adventure.',
          ru: 'Наш процесс бронирования прост и понятен, что облегчает вам планирование следующего приключения.',
          kg: 'Биздин брондоо процессибиз жөнөкөй жана түшүнүктүү, бул сизге келерки адвентураңызды планировкалоого жардам берет.',
        },
        image: 'fixtures/sun-icon.svg',
      },
    ],
    review: {
      title: {
        en: 'What Clients Say About Us',
        ru: 'Что говорят о нас клиенты',
        kg: 'Кардарлар биз жөнүндө',
      },
      description: {
        en: "We value our clients' feedback. Here's what they have to say about our services.",
        ru: 'Мы ценим отзывы наших клиентов. Вот что они говорят о наших услугах.',
        kg: 'Биз кардарларыбыздын пикирлерин баалайбыз. Мындай айтканында биздин кызматтарыбыз жөнүндө.',
      },
    },
  });

  await GuideOrder.create(
    {
      user: user._id,
      name: 'Alex',
      surname: 'Walt',
      number: '+996 800 900 900',
      message: 'I love being guide!',
    },
    {
      user: user._id,
      name: 'Arnold',
      surname: 'Skott',
      number: '+996 800 900 900',
      message: 'I love being guide!',
    },
    {
      user: user._id,
      name: 'Murat',
      surname: 'Nasyrov',
      number: '+996 800 900 900',
      message: 'I love being guide!',
    },
  );

  await PartnerOrder.create(
    {
      name: 'Sam',
      number: '+996 800 900 900',
      message: 'I would like to be a partner with your company!',
      image: 'fixtures/min-tour-logo.png',
      link: 'https://tourism.gov.kg/',
    },
    {
      name: 'Nam RM',
      number: '+996 800 900 900',
      message: 'I would like to be a partner with your company!',
      link: 'https://tourism.gov.kg/',
    },
    {
      name: 'Felton',
      number: '+996 800 900 900',
      message: 'I would like to be a partner with your company!',
    },
  );
  await StatisticsInfo.create({
    title: 'Fastest Way to Book over 50 Great Tours',
    text1:
      'Sunway provides a variety of great tours to travelers and customers throughout the world. We offer top deals at affordable prices!',
    text2:
      'Our tour agency is the leading provider of cheap air tickets as well as amazing offers for tourists and people who like to explore the untraveled world paths. We can create the most unforgettable holiday for you, your family, and friends!',
  });

  await db.close();
};

run().catch(console.error);
