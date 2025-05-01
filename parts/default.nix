{ inputs, ... }:
{
  imports = [
    inputs.treefmt-nix.flakeModule
  ];
  perSystem = {
    imports = [
      ./devshells.nix
      ./treefmt.nix
    ];
  };
}
