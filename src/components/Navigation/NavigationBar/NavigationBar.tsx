import { NavigationLinks } from './NavigationLinks';
import { Gamepad, Link, TrendingUp } from 'lucide-react';
import { NavigationLogo } from './NavigationLogo';
import { ThemeButton } from '../ThemeButton';
import { NavigationContent } from './NavigationContent';

const investmentLinks = [
  { title: 'Ações e Títulos', href: '/investimentos/acoes-titulos' },
  { title: 'Renda Fixa', href: '/investimentos/renda-fixa' },
  { title: 'Imóveis Físicos', href: '/investimentos/imoveis' },
  { title: 'Fundos Imobiliários (FIIs)', href: '/investimentos/fundos-imobiliarios' },
  { title: 'Fundos de Investimento', href: '/investimentos/fundos' },
  { title: 'Commodities', href: '/investimentos/commodities' },
  { title: 'Moedas Estrangeiras', href: '/investimentos/moedas-estrangeiras' },
  { title: 'Criptomoedas', href: '/investimentos/criptomoedas' },
];

const riskProfileLinks = [
  { title: 'Baixo Risco', href: '/perfil/baixo-risco' },
  { title: 'Médio Risco', href: '/perfil/medio-risco' },
  { title: 'Alto Risco', href: '/perfil/alto-risco' },
];

const simulatorLinks = [
  { title: 'Simulador de Investimentos', href: '/simulador' },
  { title: 'Guia do Simulador', href: '/simulador/guia' },
];

const profileTestLinks = [{ title: 'Iniciar Avaliação', href: '/teste/perfil' }];

const additionalLinks = [
  { title: 'Tesouro Direto', href: 'https://www.tesourodireto.com.br' },
  { title: 'BM&FBovespa', href: 'https://www.b3.com.br' },
  { title: 'Banco Central', href: 'https://www.bcb.gov.br/' },
  { title: 'InfoMoney', href: 'https://www.infomoney.com.br' },
  { title: 'Valor Econômico', href: 'https://valor.globo.com' },
];

const navigation = [
  {
    Icon: TrendingUp,
    sections: [
      { heading: 'Investimentos', links: investmentLinks },
      { heading: 'Perfis de Risco', links: riskProfileLinks },
    ],
  },
  {
    Icon: Gamepad,
    sections: [
      { heading: 'Simulador', links: simulatorLinks },
      { heading: 'Descubra Seu Perfil', links: profileTestLinks },
    ],
  },
  { Icon: Link, sections: [{ heading: 'Recursos Externos', links: additionalLinks }] },
];

export const NavigationBar = () => {
  return (
    <header className='fixed left-0 top-0 z-[999] h-screen bg-stone-900 px-2.5 py-4 max-sm:h-fit max-sm:w-full max-sm:px-3.5 max-sm:py-1.5'>
      <div className='container mx-auto flex h-full max-w-screen-2xl flex-col items-center gap-2 max-sm:flex-row'>
        <NavigationLogo />
        {navigation.map(({ sections, Icon }, index) => {
          return (
            <NavigationLinks key={index} Icon={Icon}>
              {sections.map(({ heading, links }) => (
                <NavigationContent heading={heading} links={links} />
              ))}
            </NavigationLinks>
          );
        })}
        <ThemeButton />
      </div>
    </header>
  );
};
