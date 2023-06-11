// import {GrUndo} from 'react-icons/gr'
import {BsFillInfoSquareFill,BsTypeBold} from 'react-icons/bs'
import {BiItalic} from 'react-icons/bi'
import {FaUnderline} from 'react-icons/fa'
import {
    AiFillContacts,AiFillDashboard,AiFillHome,AiOutlineAlignCenter, AiOutlineAlignLeft, AiOutlineAlignRight} from 'react-icons/ai'
import {BsJustify} from 'react-icons/bs'

export const shareOptions = [
    {
        value: "Whatsapp",
        icon:           "",
    },
] // ends share options
export const options = [
    {
        id: 1,
        fontName: 'quran-marker',
        text: "قرآن"
    },
    {
        id: 2,
        fontName: 'quran-bold-marker',
        text: "قرآن بولڈ"
    },
    {
        id: 3,
        fontName: 'quran-underline-marker',
        text: "قرآن انڈرلائن"
    },
    
    {
        id: 4,
        fontName: 'hadees-marker',
        text: "حدیث"
    },
    {
        id: 5,
        fontName: 'hadees-bold-marker',
        text: "حدیث بولڈ"
    },
    {
        id: 6,
        fontName: 'urdu-marker',
        text: "اردو"
    },
    {
        id: 7,
        fontName: 'urdu-underline-marker',
        text: "اردو انڈرلائن"
    },
    {
        id: 8,
        fontName: 'urdu-bold-marker',
        text: "اردو بولڈ"
    },
    {
        id: 9,
        fontName: 'ref-urdu-marker',
        text: "اردو ریف مارکر"
    },
    {
        id: 10,
        fontName: 'ref-urdu',
        text: "اردوریف"
    },
    {
        id: 11,
        fontName: 'arabic-marker',
        text: "عربی مارکر"
    },
    {
        id: 12,
        fontName: 'arabic-underline-marker',
        text: "عربی انڈرلائن"
    },
    {
        id: 13,
        fontName: 'arabic-bold-marker',
        text: "عربی بولڈ"
    },
    {
        id: 14,
        fontName: 'ref-arabic-marker',
        text: "عربی ریف مارکر"
    },
    {
        id: 15,
        fontName: 'ref-arabic',
        text: "عربی ریف"
    },
    {
        id: 16,
        fontName: 'english-marker',
        text: "english"
    },
    {
        id: 17,
        fontName: 'english-underline-marker',
        text: "english underline marker"
    },
    {
        id: 18,
        fontName: 'english-bold-marker',
        text: "english bold marker"
    },
    {
        id: 19,
        fontName: 'ref-english-marker',
        text: "ref english marker"
    },
    {
        id: 20,
        fontName: 'ref-english',
        text: "ref english"
    },
    {
        id: 21,
        fontName: 'heading-marker',
        text: "ہیڈنگ"
    },
    {
        id: 22,
        fontName: 'heading1-marker',
        text: "ہیڈنگ مارکر"
    },
    {
        id: 23,
        fontName: 'heading-underline-marker',
        text: "ہیڈنگ انڈرلائن"
    },
    {
        id: 24,
        fontName: "chapter-marker",
        text: "چیپٹر مارکر"
    }
] // ends options 
// editor buttons
export const editButtons = [
          {
                    buttonIcon:<BsTypeBold/>,
                    classes: "my-text-btn",
                    command: "bold"
          },
          {
                    buttonIcon:<BiItalic/>,
                    classes: "my-text-btn",
                    command: "italic"
          },
          {
                    buttonIcon:<FaUnderline/>,
                    classes: "my-text-btn",
                    command: "underline"
          },
          {
                    buttonIcon:<AiOutlineAlignLeft/>,
                    classes: "my-text-btn",
                    command: "justifyLeft"
          },
          {
                    buttonIcon:<AiOutlineAlignCenter/>,
                    classes: "my-text-btn",
                    command: "justifyCenter"
          },
          {
                    buttonIcon:<AiOutlineAlignRight/>,
                    classes: "my-text-btn",
                    command: "justifyRight"
          },
          {
                    buttonIcon:<BsJustify/>,
                    classes: "my-text-btn",
                    command: "justifyFull"
          },
          
]
export const bottomButtonsArray = [
    {
        text: "Home",
        path: "/",
        icon: <AiFillHome/>,

    },
    {
        text: "Dashboard",
        path: "/dashboard/mybook",
        icon: <AiFillDashboard/>
    },
    {
        text: "About Us",
        path: "/about",
        icon: <BsFillInfoSquareFill/>
    },
    {
        text: "Contact Us",
        path: "/contact",
        icon: <AiFillContacts/>
    }
] // ends bottom buttons
