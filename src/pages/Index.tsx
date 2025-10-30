import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    traffic: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const stats = [
    { label: 'Показы', value: '12.5M', growth: '+24%', icon: 'Eye' },
    { label: 'CTR', value: '3.8%', growth: '+12%', icon: 'MousePointerClick' },
    { label: 'Выручка', value: '₽1.2M', growth: '+34%', icon: 'TrendingUp' },
    { label: 'Конверсия', value: '2.1%', growth: '+8%', icon: 'Target' },
  ];

  const features = [
    {
      icon: 'DollarSign',
      title: 'Монетизация контента',
      description: 'Максимизируйте доход с помощью умной системы размещения видеорекламы'
    },
    {
      icon: 'Code2',
      title: 'API интеграция',
      description: 'Простая интеграция с любой платформой через REST API и SDK'
    },
    {
      icon: 'Shield',
      title: 'Модерация рекламы',
      description: 'Автоматическая проверка и фильтрация рекламного контента'
    },
    {
      icon: 'Target',
      title: 'Таргетинг аудитории',
      description: 'Точечное попадание по интересам, геолокации и демографии'
    },
    {
      icon: 'BarChart3',
      title: 'Детальная аналитика',
      description: 'Отслеживание показов, кликов и конверсий в реальном времени'
    },
    {
      icon: 'Wallet',
      title: 'Автовыплаты',
      description: 'Прозрачная система биллинга и моментальные выплаты'
    },
  ];

  const pricingPlans = [
    {
      name: 'Старт',
      price: '₽0',
      period: 'навсегда',
      features: ['До 100K показов/мес', 'Базовая аналитика', 'Email поддержка', 'API доступ'],
      highlight: false
    },
    {
      name: 'Профи',
      price: '₽9,900',
      period: 'в месяц',
      features: ['До 5M показов/мес', 'Расширенная аналитика', 'Приоритетная поддержка', 'Кастомизация плеера', 'A/B тестирование'],
      highlight: true
    },
    {
      name: 'Энтерпрайз',
      price: 'По запросу',
      period: '',
      features: ['Безлимитные показы', 'Персональный менеджер', 'SLA 99.99%', 'Белый лейбл', 'Кастомная интеграция'],
      highlight: false
    },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Укажите имя';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Укажите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Некорректный email';
    }

    if (!formData.website.trim()) {
      newErrors.website = 'Укажите адрес сайта';
    } else if (!/^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/.test(formData.website)) {
      newErrors.website = 'Некорректный URL';
    }

    if (!formData.traffic.trim()) {
      newErrors.traffic = 'Укажите трафик';
    } else if (isNaN(Number(formData.traffic)) || Number(formData.traffic) <= 0) {
      newErrors.traffic = 'Укажите число больше 0';
    }

    if (formData.phone && !/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/[\s()-]/g, ''))) {
      newErrors.phone = 'Некорректный телефон';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      toast({
        title: '✅ Заявка отправлена!',
        description: `${formData.name}, мы свяжемся с вами в течение 24 часов`,
      });
      
      setFormData({
        name: '',
        email: '',
        website: '',
        traffic: '',
        phone: ''
      });
      setErrors({});
      setIsDialogOpen(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/40 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber to-neon flex items-center justify-center">
              <Icon name="Play" size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-cyber to-electric bg-clip-text text-transparent">
              AdStream
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Главная', 'Издателям', 'Статистика', 'Тарифы', 'Контакты'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item.toLowerCase())}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyber to-electric transition-all group-hover:w-full" />
              </button>
            ))}
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-cyber to-electric hover:opacity-90 transition-opacity">
                <Icon name="Rocket" size={18} className="mr-2" />
                Начать
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px] bg-card border-border">
              <DialogHeader>
                <DialogTitle className="text-2xl">Подключить сайт</DialogTitle>
                <DialogDescription>
                  Заполните форму, и мы свяжемся с вами для подключения
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ivan@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <Label htmlFor="website">Адрес сайта *</Label>
                  <Input
                    id="website"
                    placeholder="https://example.com"
                    value={formData.website}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className={errors.website ? 'border-red-500' : ''}
                  />
                  {errors.website && <p className="text-xs text-red-500 mt-1">{errors.website}</p>}
                </div>
                
                <div>
                  <Label htmlFor="traffic">Ежемесячный трафик (визитов) *</Label>
                  <Input
                    id="traffic"
                    type="number"
                    placeholder="10000"
                    value={formData.traffic}
                    onChange={(e) => handleInputChange('traffic', e.target.value)}
                    className={errors.traffic ? 'border-red-500' : ''}
                  />
                  {errors.traffic && <p className="text-xs text-red-500 mt-1">{errors.traffic}</p>}
                </div>
                
                <div>
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    placeholder="+7 (999) 123-45-67"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
                </div>
                
                <Button type="submit" className="w-full bg-gradient-to-r from-cyber to-electric hover:opacity-90">
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить заявку
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto text-center max-w-5xl">
          <Badge className="mb-6 bg-primary/10 text-primary border-primary/20 animate-fade-in">
            <Icon name="Sparkles" size={14} className="mr-1" />
            Платформа нового поколения
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-slide-up">
            Монетизируйте контент
            <br />
            <span className="bg-gradient-to-r from-cyber via-electric to-neon bg-clip-text text-transparent">
              через видеорекламу
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto animate-fade-in">
            Мощная рекламная сеть для издателей с продвинутой аналитикой,
            таргетингом и автоматическими выплатами
          </p>

          <div className="flex gap-4 justify-center animate-fade-in">
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-gradient-to-r from-cyber to-electric hover:opacity-90">
                  <Icon name="Zap" size={20} className="mr-2" />
                  Подключить сайт
                </Button>
              </DialogTrigger>
            </Dialog>
            <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/5">
              <Icon name="PlayCircle" size={20} className="mr-2" />
              Смотреть демо
            </Button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {stats.map((stat, idx) => (
              <Card key={idx} className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all hover:scale-105 animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between mb-2">
                    <Icon name={stat.icon as any} size={20} className="text-primary" />
                    <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-400 border-green-500/20">
                      {stat.growth}
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Всё для эффективной
              <span className="bg-gradient-to-r from-cyber to-electric bg-clip-text text-transparent"> монетизации</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Комплексная платформа с инструментами для издателей и рекламодателей
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx} className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-all hover:scale-105 group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyber/20 to-electric/20 flex items-center justify-center mb-4 group-hover:animate-glow">
                    <Icon name={feature.icon as any} size={24} className="text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Живая статистика
              <span className="bg-gradient-to-r from-cyber to-electric bg-clip-text text-transparent"> платформы</span>
            </h2>
          </div>

          <Tabs defaultValue="impressions" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="impressions">Показы</TabsTrigger>
              <TabsTrigger value="revenue">Выручка</TabsTrigger>
              <TabsTrigger value="ctr">CTR</TabsTrigger>
              <TabsTrigger value="conversions">Конверсии</TabsTrigger>
            </TabsList>
            
            <TabsContent value="impressions">
              <Card className="bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Eye" size={24} className="text-primary" />
                    Показы рекламы
                  </CardTitle>
                  <CardDescription>Динамика за последние 30 дней</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: 'Видео', value: 85, count: '10.6M' },
                      { label: 'Баннеры', value: 65, count: '1.5M' },
                      { label: 'Нативная', value: 42, count: '420K' },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{item.label}</span>
                          <span className="text-sm text-muted-foreground">{item.count}</span>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="revenue">
              <Card className="bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="DollarSign" size={24} className="text-primary" />
                    Доход издателей
                  </CardTitle>
                  <CardDescription>Распределение по источникам</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: 'CPM модель', value: 92, count: '₽980K' },
                      { label: 'CPC модель', value: 68, count: '₽180K' },
                      { label: 'CPA модель', value: 45, count: '₽40K' },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{item.label}</span>
                          <span className="text-sm text-muted-foreground">{item.count}</span>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ctr">
              <Card className="bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="MousePointerClick" size={24} className="text-primary" />
                    Кликабельность (CTR)
                  </CardTitle>
                  <CardDescription>По типам объявлений</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: 'In-stream video', value: 88, count: '4.2%' },
                      { label: 'Out-stream video', value: 72, count: '3.5%' },
                      { label: 'Display ads', value: 55, count: '2.8%' },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{item.label}</span>
                          <span className="text-sm text-muted-foreground">{item.count}</span>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="conversions">
              <Card className="bg-card/50 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Target" size={24} className="text-primary" />
                    Конверсии
                  </CardTitle>
                  <CardDescription>Эффективность кампаний</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { label: 'E-commerce', value: 78, count: '2.8%' },
                      { label: 'Lead generation', value: 64, count: '2.2%' },
                      { label: 'Brand awareness', value: 52, count: '1.5%' },
                    ].map((item, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">{item.label}</span>
                          <span className="text-sm text-muted-foreground">{item.count}</span>
                        </div>
                        <Progress value={item.value} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Выберите свой
              <span className="bg-gradient-to-r from-cyber to-electric bg-clip-text text-transparent"> тариф</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Прозрачные цены без скрытых комиссий
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, idx) => (
              <Card 
                key={idx} 
                className={`relative bg-card/50 backdrop-blur border-border/50 hover:scale-105 transition-all ${
                  plan.highlight ? 'border-primary shadow-lg shadow-primary/20 animate-glow' : ''
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <Badge className="bg-gradient-to-r from-cyber to-electric">
                      Популярный
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground ml-2">{plan.period}</span>}
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {plan.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full mt-6 ${
                      plan.highlight 
                        ? 'bg-gradient-to-r from-cyber to-electric hover:opacity-90' 
                        : 'bg-primary/10 hover:bg-primary/20'
                    }`}
                  >
                    {plan.name === 'Энтерпрайз' ? 'Связаться с нами' : 'Подключить'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <Card className="bg-gradient-to-br from-cyber/10 via-electric/10 to-neon/10 border-primary/20">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl mb-4">
                Готовы начать монетизацию?
              </CardTitle>
              <CardDescription className="text-lg">
                Присоединяйтесь к 10,000+ издателям, которые уже зарабатывают с AdStream
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-gradient-to-r from-cyber to-electric hover:opacity-90">
                    <Icon name="Rocket" size={20} className="mr-2" />
                    Подключить сайт бесплатно
                  </Button>
                </DialogTrigger>
              </Dialog>
              <Button size="lg" variant="outline" className="border-primary/30">
                <Icon name="MessageCircle" size={20} className="mr-2" />
                Связаться с нами
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t border-border/40 py-12 px-6 bg-muted/20">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyber to-neon flex items-center justify-center">
                  <Icon name="Play" size={18} className="text-white" />
                </div>
                <span className="text-xl font-bold">AdStream</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Платформа видеорекламы нового поколения
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Продукт</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Издателям</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Рекламодателям</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API документация</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Интеграции</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Компания</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Блог</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Карьера</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Связь</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <a href="mailto:info@adstream.ru" className="hover:text-primary transition-colors">
                    info@adstream.ru
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+7 (495) 123-45-67</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border/40 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 AdStream. Все права защищены
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-primary transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;