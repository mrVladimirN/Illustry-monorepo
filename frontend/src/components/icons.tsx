import {
  AlarmClock,
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  BarChart3,
  CalendarDays,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  ChevronUp,
  Circle,
  Copy,
  CreditCard,
  Crop,
  DollarSign,
  Download,
  Edit,
  Eye,
  EyeOff,
  FileTerminal,
  Filter,
  Footprints,
  HardHat,
  Image,
  Loader2,
  LogOut,
  Menu,
  MessageSquare,
  Minus,
  Moon,
  MoreHorizontal,
  MoreVertical,
  Package,
  Plus,
  PlusCircle,
  RefreshCw,
  Search,
  Send,
  Settings,
  Shirt,
  ShoppingBag,
  ShoppingCart,
  Sliders,
  SlidersHorizontal,
  Star,
  SunMedium,
  Trash,
  Twitter,
  UploadCloud,
  User,
  Volume2,
  VolumeX,
  Wallet,
  X,
  type LucideIcon,
  type LucideProps
} from 'lucide-react';

export type Icon = LucideIcon;

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  star: Star,
  twitter: Twitter,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  chevronsLeft: ChevronsLeft,
  chevronsRight: ChevronsRight,
  chevronUp: ChevronUp,
  chevronDown: ChevronDown,
  chevronUpDown: ChevronsUpDown,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  menu: Menu,
  verticalThreeDots: MoreVertical,
  horizontalThreeDots: MoreHorizontal,
  verticalSliders: Sliders,
  horizontalSliders: SlidersHorizontal,
  circle: Circle,
  check: Check,
  add: Plus,
  addCircle: PlusCircle,
  remove: Minus,
  view: Eye,
  hide: EyeOff,
  trash: Trash,
  edit: Edit,
  crop: Crop,
  reset: RefreshCw,
  send: Send,
  copy: Copy,
  downlaod: Download,
  warning: AlertTriangle,
  search: Search,
  filter: Filter,
  alarm: AlarmClock,
  calendar: CalendarDays,
  user: User,
  terminal: FileTerminal,
  settings: Settings,
  logout: LogOut,
  volumne: Volume2,
  volumneMute: VolumeX,
  message: MessageSquare,
  billing: CreditCard,
  wallet: Wallet,
  dollarSign: DollarSign,
  cart: ShoppingCart,
  product: Package,
  store: ShoppingBag,
  chart: BarChart3,
  upload: UploadCloud,
  placeholder: Image,
  clothing: Shirt,
  shoes: Footprints,
  accessories: HardHat,
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <svg
        width="109"
        height="35"
        viewBox="0 0 109 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={`M34.4169 24.184C35.631 24.184 36.8341 23.5322 38.0261 22.2286V10.728C38.0261 10.2198
            38.313 9.96571 38.887 9.96571H42.463C42.7279 9.96571 42.9045 10.021 42.9928 10.1314C43.1032
            10.2419 43.1583 10.4187 43.1583 10.6617L43.0921 26.9349C43.0921 27.1116 43.0369 27.2552
            42.9266 27.3657C42.8383 27.4762 42.7169 27.5314 42.5623 27.5314H38.6221C38.291 27.5314
            38.1254 27.3436 38.1254 26.968V25.344C38.1254 25.2114 38.0923 25.1341 38.0261 25.112C37.9599
            25.0899 37.8716 25.123 37.7612 25.2114C36.8341 26.1615 35.918 26.8465 35.0129 27.2663C34.1079
            27.664 33.1256 27.8629 32.066 27.8629C30.5871 27.8629 29.373 27.3878 28.4238 26.4377C27.4746 25.4655
            27 24.1619 27 22.5269V10.7611C27 10.2309 27.2649 9.96571 27.7947 9.96571H31.47C31.8894 9.96571
            32.0991 10.1977 32.0991 10.6617V21.7977C32.0991 22.5269 32.3089 23.1124 32.7283 23.5543C33.1477
            23.9741 33.7106 24.184 34.4169 24.184Z`}
          fill="#333333"
        />
        <path
          d={`M57.5882 14.5394C56.6831 13.3463 55.3918 12.7497 53.7141 12.7497C52.8753 12.7497
          52.18 12.9154 51.6281 13.2469C51.0763 13.5562 50.8003 13.987 50.8003 14.5394C50.8003
          14.8488 50.9217 15.136 51.1646 15.4011C51.4294 15.6442 51.9261 15.8541 52.6546
          16.0309L56.4624 16.9589C58.2062 17.3787 59.4865 18.0526 60.3033 18.9806C61.12
          19.8865 61.5284 20.9581 61.5284 22.1954C61.5284 23.941 60.8 25.3219 59.3431
          26.3383C57.8862 27.3547 55.9767 27.8629 53.6148 27.8629C51.7164 27.8629
          50.0719 27.5314 48.6812 26.8686C47.2905 26.1836 46.3082 25.2998 45.7343
          24.2171C45.6239 24.0625 45.5687 23.9189 45.5687 23.7863C45.5687 23.6316
          45.646 23.5211 45.8005 23.4549L48.0521 22.2949C48.2287 22.2065 48.3832
          22.1623 48.5156 22.1623C48.6481 22.1623 48.7695 22.2175 48.8799 22.328C49.3655
          23.013 49.9505 23.5653 50.6348 23.9851C51.3412 24.3829 52.2683 24.5817 53.4161
          24.5817C54.4536 24.5817 55.2924 24.427 55.9326 24.1177C56.5948 23.8084 56.9259
          23.3554 56.9259 22.7589C56.9259 22.3611 56.7604 22.0297 56.4293 21.7646C56.0981
          21.4994 55.5353 21.2674 54.7406 21.0686L51.3301 20.3394C47.9748 19.6103 46.2972 17.9421
          46.2972 15.3349C46.2972 14.2301 46.5952 13.2469 47.1912 12.3851C47.8093 11.5234 48.6812
          10.8495 49.807 10.3634C50.9328 9.87733 52.2572 9.63429 53.7804 9.63429C55.3918 9.63429
          56.8156 9.93257 58.0517 10.5291C59.31 11.1257 60.215 11.877 60.7668 12.7829C60.8993
          12.9596 60.9655 13.1143 60.9655 13.2469C60.9655 13.3794 60.8883 13.4899 60.7337
          13.5783L58.3497 14.7383C58.2835 14.7825 58.1952 14.8046 58.0848 14.8046C57.8862
          14.8046 57.7206 14.7162 57.5882 14.5394Z`}
          fill="#333333"
        />
        <path
          d={`M71.7026 13.4789C71.4598 13.4789 71.3384 13.6114 71.3384 13.8766V21.864C71.3384
          22.6152 71.515 23.1566 71.8682 23.488C72.2214 23.7973 72.7843 23.952 73.5569
          23.952H75.3449C75.4994 23.952 75.6208 24.0072 75.7091 24.1177C75.7974 24.2061
          75.8416 24.3387 75.8416 24.5154L75.8085 26.5371C75.8085 26.979 75.5656 27.2442
          75.08 27.3326C74.1529 27.4651 72.8395 27.5314 71.1398 27.5314C69.5946 27.5314 68.3915
          27.1669 67.5306 26.4377C66.6697 25.7086 66.2393 24.648 66.2393 23.256V13.976C66.2393
          13.6446 66.0958 13.4789 65.8088 13.4789H63.789C63.3696 13.4789 63.1599 13.291 63.1599
          12.9154V10.4629C63.1599 10.1314 63.3586 9.96571 63.7559 9.96571H66.0406C66.2172 9.96571
          66.3276 9.84419 66.3717 9.60114L66.8353 4.56343C66.8794 4.18781 67.045 4 67.332
          4H70.9411C71.0956 4 71.217 4.05524 71.3053 4.16571C71.4157 4.27619 71.4709 4.43086
          71.4709 4.62971V9.60114C71.4709 9.8221 71.5812 9.93257 71.802 9.93257H75.2787C75.676
          9.93257 75.8747 10.1093 75.8747 10.4629V12.9154C75.8747 13.291 75.6539 13.4789 75.2125 13.4789H71.7026Z`}
          fill="#333333"
        />
        <path
          d={`M79.3064 27.5314C78.8428 27.5314 78.611 27.3105 78.611 26.8686V10.5954C78.611 10.1756
          78.7876 9.96571 79.1408 9.96571H83.0148C83.368 9.96571 83.5446 10.1535 83.5446
          10.5291V12.4846C83.5446 12.573 83.5667 12.6392 83.6108 12.6834C83.655
          12.7276 83.6991 12.7497 83.7433 12.7497C83.8095 12.7497 83.8978 12.6945
          84.0082 12.584C84.6704 11.7002 85.454 10.9931 86.3591 10.4629C87.2641
          9.91048 88.125 9.63429 88.9418 9.63429C89.7364 9.63429 90.1338 9.8221
          90.1338 10.1977V14.0423C90.1338 14.197 90.0896 14.3185 90.0013
          14.4069C89.913 14.4952 89.7916 14.5173 89.6371 14.4731C88.9307 14.2964 88.1581
          14.208 87.3193 14.208C86.7674 14.208 86.2046 14.3516 85.6306 14.6389C85.0788
          14.904 84.6152 15.2686 84.2399 15.7326C83.8868 16.1745 83.7102 16.6274 83.7102
          17.0914V26.7691C83.7102 27.2773 83.4232 27.5314 82.8493 27.5314H79.3064Z`
          }
          fill="#333333"
        />
        <path
          d={`M94.0668 34.1817C93.3383 34.1817 92.8306 34.1375 92.5437 34.0491C92.2567 33.9829 92.1132
          33.8171 92.1132 33.552V31C92.1132 30.6465 92.4333 30.4697 93.0734 30.4697H95.325C95.9872
          30.4697 97.0144 29.5082 97.5 29C97.9856 28.5139 98.0401 27.5204 98.0401 26.968C98.0401
          26.7691 98.007 26.5924 97.9408 26.4377L91.5834 10.7611C91.5393 10.6286 91.5172 10.5402
          91.5172 10.496C91.5172 10.3413 91.5724 10.2198 91.6828 10.1314C91.7931 10.021 91.9366
          9.96571 92.1132 9.96571H96.2852C96.4398 9.96571 96.5832 10.021 96.7157 10.1314C96.8702
          10.2198 96.9695 10.3524 97.0137 10.5291L100.689 20.4057C100.755 20.6267 100.844 20.7371
          100.954 20.7371C101.042 20.7371 101.142 20.6156 101.252 20.3726L104.894 10.496C105.049
          10.1425 105.292 9.96571 105.623 9.96571H108.47C108.625 9.96571 108.746 10.021 108.834
          10.1314C108.945 10.2198 109 10.3303 109 10.4629C109 10.507 108.978 10.5954 108.934
          10.728L102.146 27.5314C101.528 29.056 100.612 31.3867 99.9275 32.16C99.2432 32.9333
          98.4485 33.4636 97.5435 33.7509C96.6605 34.0381 95.5016 34.1817 94.0668 34.1817Z`
          }
          fill="#333333"
        />
        <path
          d="M0 1C0 0.447716 0.447715 0 1 0H5C5.55228 0 6 0.447715 6 1V26.5C6
          27.0523 5.55228 27.5 5 27.5H1C0.447715 27.5 0 27.0523 0 26.5V1Z"
          fill="#29B48A"
        />
        <path
          d="M9 6C9 5.44772 9.44772 5 10 5H14C14.5523 5 15 5.44772
          15 6V26.5C15 27.0523 14.5523 27.5 14 27.5H10C9.44772 27.5 9 27.0523 9 26.5V6Z"
          fill="#B6217A"
        />
        <path
          d="M18 6C18 5.44772 18.4477 5 19 5H23C23.5523 5 24 5.44772
          24 6V26.5C24 27.0523 23.5523 27.5 23 27.5H19C18.4477 27.5 18 27.0523 18 26.5V6Z"
          fill="#3C94D3"
        />
        <path
          d="M78 32.5C78 33.6046 77.1046 34.5 76 34.5C74.8954 34.5 74
          33.6046 74 32.5C74 31.3954 74.8954 30.5 76 30.5C77.1046 30.5 78 31.3954 78 32.5Z"
          fill="#29B48A"
        />
        <path
          d="M84 32.5C84 33.6046 83.1046 34.5 82 34.5C80.8954 34.5 80
          33.6046 80 32.5C80 31.3954 80.8954 30.5 82 30.5C83.1046 30.5 84 31.3954 84 32.5Z"
          fill="#B6217A"
        />
        <path
          d="M90 32.5C90 33.6046 89.1046 34.5 88 34.5C86.8954 34.5 86
          33.6046 86 32.5C86 31.3954 86.8954 30.5 88 30.5C89.1046 30.5 90 31.3954 90 32.5Z"
          fill="#3C94D3"
        />
      </svg>
    </svg>
  ),
  gitHub: (props: LucideProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d={`
        M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781
        0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78
        13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996
        2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567
        1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559
        -5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331
        -8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568
        -3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133
        6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699
        6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41
        -10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516
        -22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637
        22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952
        23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421
        l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325
        40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941
        22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286
        -18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562
        2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126
        41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z
      `}
      ></path>
    </svg>
  )
};
