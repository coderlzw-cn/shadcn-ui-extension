"use client";
import {Button} from "@/components/ui/button";
import {toast as sonnerToast} from "sonner";
import z from "zod";
import {FormField, SignInForm} from "./signInForm";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {cn} from "@/lib/utils";

// 基础登录表单组件
export function LoginForm() {
  const loginSchema = z.object({
    email: z.email({ message: "请输入有效的邮箱地址" }),
    password: z.string().min(8, { message: "密码至少需要8个字符" })
  });

  const loginFields: FormField<typeof loginSchema>[] = [
    {
      name: "email",
      label: "邮箱",
      type: "email",
      placeholder: "请输入您的邮箱",
      description: "请输入您的邮箱地址",
      required: true,
      maxLength: 100,
      defaultValue: "test@test.com",
      pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"   // 邮箱格式
    },
    {
      name: "password",
      label: "密码",
      type: "password",
      placeholder: "请输入您的密码",
      description: "密码至少需要8个字符",
      required: true,
      minLength: 8,
      maxLength: 50,
      defaultValue: "12345678",
      pattern: "^[a-zA-Z0-9_]+$"
    }
  ];

  return (
    <Card
    className={cn(
      "group relative overflow-hidden transition-all duration-300 ease-in-out",
      "hover:shadow-lg hover:shadow-primary/5",
      "border-border/50 bg-card/50 backdrop-blur-sm",
      "dark:bg-card/30 dark:border-border/30",
      "w-full max-w-md mx-auto"
    )}
    >
      <CardHeader>
        <CardTitle>登录</CardTitle>
        <CardDescription>请输入您的邮箱和密码</CardDescription>
      </CardHeader>
      <CardContent>
        <SignInForm
          formFields={loginFields}
          formSchema={loginSchema}
          onSubmit={(values) => {
            toast({ code: JSON.stringify(values, null, 2) });
          }}
          title="欢迎回来"
          subTitle="登录您的账户以继续"
          submitButtonText="登录"
          className="w-full max-w-md mx-auto"
          oauth={oauthConfig}
          footer={
            <div className="text-center text-sm">
              还没有账户？{" "}
              <Button variant="link" className="underline underline-offset-4 p-0 h-auto">
                立即注册
              </Button>
            </div>
          }
        />
      </CardContent>
    </Card>
  );
}

// 注册表单组件
export function RegisterForm() {
  const registerSchema = z
    .object({
      username: z.string().min(3, { message: "用户名至少需要3个字符" }),
      email: z.string().email({ message: "请输入有效的邮箱地址" }),
      password: z.string().min(8, { message: "密码至少需要8个字符" }),
      confirmPassword: z.string(),
      agreeToTerms: z.boolean()
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "密码不匹配",
      path: ["confirmPassword"]
    })
    .refine((data) => data.agreeToTerms === true, {
      message: "必须同意服务条款",
      path: ["agreeToTerms"]
    });

  const registerFields: FormField<typeof registerSchema>[] = [
    {
      name: "username",
      label: "用户名",
      type: "text",
      placeholder: "请输入用户名",
      description: "用户名至少需要3个字符",
      required: true,
      minLength: 3,
      maxLength: 20,
      pattern: "^[a-zA-Z0-9_]+$",
      defaultValue: "test"
    },
    {
      name: "email",
      label: "邮箱",
      type: "email",
      placeholder: "请输入邮箱",
      description: "请输入有效的邮箱地址",
      required: true,
      maxLength: 100,
      defaultValue: "test@test.com"
    },
    {
      name: "password",
      label: "密码",
      type: "password",
      placeholder: "请输入密码",
      description: "密码至少需要8个字符",
      required: true,
      minLength: 8,
      maxLength: 50,
      defaultValue: "12345678"
    },
    {
      name: "confirmPassword",
      label: "确认密码",
      type: "password",
      placeholder: "请再次输入密码",
      description: "请再次输入密码以确认",
      required: true,
      minLength: 8,
      maxLength: 50,
      defaultValue: "12345678"
    },
    {
      name: "agreeToTerms",
      label: "服务条款",
      type: "checkbox",
      checkboxText: "我已阅读并同意《服务条款》和《隐私政策》",
      description: "必须同意服务条款才能继续",
      required: true,
      defaultValue: true
    }
  ];

  return (
    <Card
    className={cn(
      "group relative overflow-hidden transition-all duration-300 ease-in-out",
      "hover:shadow-lg hover:shadow-primary/5",
      "border-border/50 bg-card/50 backdrop-blur-sm",
      "dark:bg-card/30 dark:border-border/30",
      "w-full max-w-md mx-auto"
    )}
    >
      <CardHeader>
        <CardTitle>创建账户</CardTitle>
        <CardDescription>填写以下信息创建您的账户</CardDescription>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-auto">
        <SignInForm
          formFields={registerFields}
          formSchema={registerSchema}
          onSubmit={(values) => {
            console.log("表单提交:", values);
            toast({
              code: JSON.stringify(values, null, 2)
            });
          }}
          title="创建账户"
          subTitle="填写以下信息创建您的账户"
          submitButtonText="注册"
          className="w-full max-w-md mx-auto"
          oauth={oauthConfig}
          footer={
            <div className="text-center text-sm">
              已有账户？{" "}
              <Button variant="link" className="underline underline-offset-4 p-0 h-auto">
                立即登录
              </Button>
            </div>
          }
        />
      </CardContent>
    </Card>
  );
}

// 复杂表单组件
export function ComplexForm() {
  const complexSchema = z.object({
    name: z.string().min(2, { message: "姓名至少需要2个字符" }),
    email: z.string().email({ message: "请输入有效的邮箱地址" }),
    phone: z.string().min(11, { message: "请输入有效的手机号码" }),
    age: z.coerce.number().min(18, { message: "年龄必须大于18岁" }),
    gender: z.string().min(1, { message: "请选择性别" }),
    interests: z.array(z.string()).min(1, { message: "请至少选择一个兴趣" }),
    bio: z.string().min(10, { message: "个人简介至少需要10个字符" }),
    newsletter: z.boolean(),
    notifications: z.boolean()
  });

  const complexFields: FormField<typeof complexSchema>[] = [
    {
      name: "name",
      label: "姓名",
      type: "text",
      placeholder: "请输入您的姓名",
      description: "请输入您的真实姓名",
      required: true,
      minLength: 2,
      maxLength: 50,
      defaultValue: "张三"
    },
    {
      name: "email",
      label: "邮箱",
      type: "email",
      placeholder: "请输入邮箱地址",
      description: "用于接收重要通知",
      required: true,
      maxLength: 100,
      defaultValue: "zhangsan@qq.com"
    },
    {
      name: "phone",
      label: "手机号码",
      type: "text",
      placeholder: "请输入手机号码",
      description: "用于身份验证",
      required: true,
      minLength: 11,
      maxLength: 11,
      pattern: "^1[3-9]\\d{9}$",
      defaultValue: "13800138000"
    },
    {
      name: "age",
      label: "年龄",
      type: "number",
      placeholder: "请输入年龄",
      description: "必须年满18岁",
      required: true,
      min: 18,
      max: 120,
      step: 1,
      defaultValue: 20
    },
    {
      name: "gender",
      label: "性别",
      type: "radio",
      options: [
        { label: "男", value: "male" },
        { label: "女", value: "female" },
        { label: "其他", value: "other" }
      ],
      description: "请选择您的性别",
      required: true,
      defaultValue: "male"
    },
    {
      name: "interests",
      label: "兴趣爱好",
      type: "checkbox",
      options: [
        { label: "技术", value: "tech" },
        { label: "音乐", value: "music" },
        { label: "运动", value: "sports" },
        { label: "阅读", value: "reading" },
        { label: "旅行", value: "travel" },
        { label: "摄影", value: "photography" },
        { label: "烹饪", value: "cooking" },
        { label: "游戏", value: "gaming" },
        { label: "绘画", value: "painting" },
        { label: "编程", value: "programming" },
        { label: "电影", value: "movies" },
        { label: "园艺", value: "gardening" }
      ],
      description: "请选择您感兴趣的内容（可多选）",
      required: true,
      defaultValue: ["tech", "music"]
    },
    {
      name: "bio",
      label: "个人简介",
      type: "textarea",
      placeholder: "请简单介绍一下自己",
      description: "至少需要10个字符",
      required: true,
      minLength: 10,
      maxLength: 500,
      defaultValue: "我是一个热爱技术、音乐和运动的年轻人"
    },
    {
      name: "newsletter",
      label: "订阅新闻通讯",
      type: "switch",
      description: "接收最新的产品更新和新闻",
      defaultValue: true
    },
    {
      name: "notifications",
      label: "通知设置",
      type: "checkbox",
      checkboxText: "接收重要通知和提醒",
      description: "您可以随时在设置中关闭此功能",
      defaultValue: true
    }
  ];

  return (
    <Card
    className={cn(
      "group relative overflow-hidden transition-all duration-300 ease-in-out",
      "hover:shadow-lg hover:shadow-primary/5",
      "border-border/50 bg-card/50 backdrop-blur-sm",
      "dark:bg-card/30 dark:border-border/30",
      "w-full max-w-md mx-auto"
    )}
    >
      <CardHeader>
        <CardTitle>个人信息</CardTitle>
        <CardDescription>请完善您的个人信息</CardDescription>
      </CardHeader>
      <CardContent className="max-h-96 overflow-y-auto relative pb-10">
        <SignInForm
          formFields={complexFields}
          formSchema={complexSchema}
          onSubmit={(values) => {
            console.log("表单提交:", values);
            toast({
              code: JSON.stringify(values, null, 2)
            });
          }}
          title="个人信息"
          subTitle="请完善您的个人信息"
          submitButtonText="保存"
          className="w-full max-w-2xl mx-auto"
          footer={<div className="text-center text-sm text-muted-foreground">您的信息将被安全保存，我们承诺保护您的隐私</div>}
        />
        {/* <CardFooter className="absolute z-10 bottom-0 left-0 right-0 bg-red-500">
          <Button variant="outline" className="w-full">
            保存111
          </Button>
        </CardFooter> */}
      </CardContent>
    </Card>
  );
}

// OAuth 配置
const oauthConfig = [
  {
    name: "Google",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4">
        <path
          d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
          fill="currentColor"
        />
      </svg>
    ),
    onClick: () => {
      console.log("Google 登录");
    }
  },
  {
    name: "Apple",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4">
        <path
          d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
          fill="currentColor"
        />
      </svg>
    ),
    onClick: () => {
      console.log("Apple 登录");
    }
  },
  {
    name: "微信",
    icon: (
      <svg viewBox="-7.582815 -10.290675 65.71773 61.74405" className="w-6! h-6!">
        <defs>
          <linearGradient gradientUnits="userSpaceOnUse" gradientTransform="scale(1.06228 .94137)" id="a" y2=".1504" x2="17.2422" y1="32.4312" x1="17.2422">
            <stop offset="0%" stopColor="#78D431" />
            <stop offset="100%" stopColor="#9EEE69" />
            <stop offset="100%" stopColor="#9EEE69" />
          </linearGradient>
          <linearGradient gradientUnits="userSpaceOnUse" gradientTransform="scale(1.05667 .94637)" id="b" y2="14.6966" x2="33.4727" y1="41.634" x1="33.4727">
            <stop offset="0%" stopColor="#E4E6E6" />
            <stop offset="100%" stopColor="#F5F5FF" />
          </linearGradient>
        </defs>
        <g fill="none">
          <path
            fill="url(#a)"
            d="M0 15.3063c0 4.5919 2.4846 8.787 6.3245 11.5648.3388.2267.5082.5669.5082 1.0204 0 .1134-.0565.2835-.0565.3968-.2823 1.1338-.7906 3.0046-.847 3.0613-.0565.17-.113.2834-.113.4535 0 .3402.2824.6236.6212.6236.113 0 .2259-.0567.3388-.1134l4.0093-2.3243c.2823-.17.6211-.2834.96-.2834.1693 0 .3952 0 .5646.0567 1.8635.5669 3.8963.8503 5.9857.8503 10.1078 0 18.2957-6.8595 18.2957-15.3063S28.4035 0 18.2958 0C8.1879 0 0 6.8595 0 15.3063"
          />
          <path
            fill="url(#b)"
            d="M35.3424 39.6205c1.7463 0 3.4363-.2284 4.9572-.6854.1127-.057.2817-.057.4507-.057.2817 0 .5633.1142.7887.2284l3.3236 1.942c.1126.057.169.1142.2816.1142.2817 0 .507-.2285.507-.514 0-.1143-.0563-.2285-.0563-.3999 0-.0571-.4507-1.5992-.676-2.5702-.0563-.1142-.0563-.2285-.0563-.3427 0-.3427.169-.6283.4506-.8568 3.211-2.3417 5.239-5.8258 5.239-9.7097 0-7.0824-6.8163-12.851-15.2098-12.851s-15.2097 5.7115-15.2097 12.851c0 7.0824 6.8162 12.8511 15.2097 12.8511z"
          />
          <path
            fill="#187E28"
            d="M14.5484 10.3647c0 1.3223-1.0389 2.369-2.3512 2.369-1.3124 0-2.3513-1.0467-2.3513-2.369 0-1.3223 1.039-2.369 2.3513-2.369 1.3123 0 2.3512 1.0467 2.3512 2.369m12.1972 0c0 1.3223-1.039 2.369-2.3513 2.369-1.3123 0-2.3512-1.0467-2.3512-2.369 0-1.3223 1.039-2.369 2.3512-2.369 1.3124 0 2.3513 1.0467 2.3513 2.369"
          />
          <path
            fill="#858C8C"
            d="M38.502 22.8023c0 1.1517.9143 2.073 2.0573 2.073 1.143 0 2.0573-.9213 2.0573-2.073 0-1.1516-.9144-2.0729-2.0573-2.0729-1.143 0-2.0574.9213-2.0574 2.073m-10.1398 0c0 1.1516.9144 2.0729 2.0573 2.0729 1.143 0 2.0574-.9213 2.0574-2.073 0-1.1516-.9144-2.0729-2.0574-2.0729-1.143 0-2.0573.9213-2.0573 2.073"
          />
        </g>
      </svg>
    ),
    onClick: () => {
      console.log("微信登录");
    }
  }
];

function toast(toast: { code: string }) {
  return sonnerToast.custom(() => <Toast code={toast.code} />);
}

function Toast(props: { code: string }) {
  const { code } = props;

  return (
    <div className="flex rounded-lg bg-white shadow-lg ring-1 ring-black/5 w-full md:max-w-[364px] items-center p-4">
      <pre className="text-xs whitespace-pre-wrap">{code}</pre>
    </div>
  );
}
