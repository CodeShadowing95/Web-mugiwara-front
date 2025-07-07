import { useFarm2 } from '@/app/FarmContext2'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Farm } from '@/types'
import { CircleArrowUp, CircleCheckBig, Edit, Eye, MapPin, MoreVertical, Power, PowerOff, Star, Trash2 } from 'lucide-react'

const FarmCardDetail = ({ farm }: { farm: Farm }) => {
  const farmContext = useFarm2()

  if (!farmContext) {
    return null
  }

  const { farms: farmsByUser, setFarms, selectedFarm } = farmContext

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "on":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Disponible</Badge>
      case "off":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Indisponible</Badge>
      case "pending":
        return <Badge className="bg-orange-100 text-orange-800 border-orange-200">En attente</Badge>
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Inconnu</Badge>
    }
  }

  const toggleFarmStatus = (farmId: number) => {
    const updatedFarms = farmsByUser.map((farm) => {
      if (farm.id === farmId) {
        return {
          ...farm,
          status: farm.status === "on" ? "off" : "on",
        }
      }
      return farm
    })

    setFarms(updatedFarms)
  }

  return (
    <Card key={farm.id} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 p-0">
      <div className="relative">
        <img
          src="/imgs/farm.jpg"
          alt={farm.name}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <div className="absolute top-4 left-4">{getStatusBadge(farm.status)}</div>
        <div className="absolute top-4 right-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {farm.id === selectedFarm?.id ? (
                <DropdownMenuItem className="text-blue-500">
                  <CircleCheckBig className="w-4 h-4 mr-2 text-blue-500" />
                  Ferme courante
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem>
                  <CircleArrowUp className="w-4 h-4 mr-2" />
                  Gérer la ferme
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Eye className="w-4 h-4 mr-2" />
                Voir les détails
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Edit className="w-4 h-4 mr-2" />
                Modifier
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toggleFarmStatus(farm.id)}>
                {farm.status === "on" ? (
                  <>
                    <PowerOff className="w-4 h-4 mr-2" />
                    Désactiver
                  </>
                ) : (
                  <>
                    <Power className="w-4 h-4 mr-2" />
                    Activer
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="w-4 h-4 mr-2" />
                Supprimer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <CardContent className="px-6 pb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarFallback>
                <img
                  src={farm.avatar}
                  alt={`Avatar de ${farm.name}`}
                  className={`w-full h-full object-cover ${farm.color}`}
                />
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-farm-green-dark text-lg">{farm.name}</h3>
              <div className="flex flex-wrap gap-1">
                {farm.farmTypes?.split(',').length > 2 ? (
                  <>
                    {farm.farmTypes?.split(',').slice(0, 2).map((type, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-[var(--farm-green)]/10 text-[var(--farm-green)]"
                      >
                        {type.trim()}
                      </span>
                    ))}
                    <Tooltip>
                      <TooltipTrigger>
                        <span id="more-types" className="px-2 py-1 text-xs font-medium rounded-full bg-[var(--farm-green)]/10 text-[var(--farm-green)]">
                          +{farm.farmTypes?.split(',').length - 2} types
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" align="center">
                        <p>{farm.farmTypes?.split(',').slice(2).join(', ')}</p>
                      </TooltipContent>
                    </Tooltip>
                  </>
                ) : (
                  farm.farmTypes?.split(',').map((type, index) => (
                    <span key={index} className="px-2 py-1 text-xs font-medium rounded-full bg-[var(--farm-green)]/10 text-[var(--farm-green)]">
                      {type.trim()}
                    </span>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          {farm.address}
        </div>

        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{farm.description}</p>

        {/* Certifications */}
        {/* <div className="flex flex-wrap gap-2 mb-4">
                                    {farm.certifications.map((cert, index) => (
                                        <Badge key={index} variant="outline" className="text-xs">
                                            <Award className="w-3 h-3 mr-1" />
                                            {cert}
                                        </Badge>
                                    ))}
                                </div> */}

        {/* Statistiques */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            {/* <p className="text-lg font-bold text-farm-green-dark">{farm.products}</p> */}
            <p className="text-lg font-bold text-farm-green-dark">0</p>
            <p className="text-xs text-gray-600">Produits</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            {/* <p className="text-lg font-bold text-farm-green-dark">{farm.customers}</p> */}
            <p className="text-lg font-bold text-farm-green-dark">0</p>
            <p className="text-xs text-gray-600">Clients</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-sm font-medium">{farm.rating || 0.0}</span>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-farm-green-dark">{farm.totalSales || 0}</p>
            <p className="text-xs text-gray-600">Ventes totales</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">Dernière activité: {new Date(farm.updatedAt).toLocaleDateString()} à {new Date(farm.updatedAt).toLocaleTimeString()}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default FarmCardDetail